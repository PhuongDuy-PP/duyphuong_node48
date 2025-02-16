import { createAccessToken } from "../config/jwt.js";
import transporter from "../config/transporter.js";
import connect from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";

const models = initModels(connect);

const register = async (req, res) => {
   try {
      // 1 - Nhận dữ liệu: email pass_word, full_name
      const { full_name, email, pass_word } = req.body;
      console.log("Dữ liệu nhận:", { full_name, email, pass_word });

      // 2 - Kiểm tra email đã tòn tại bên trong db hay chưa
      // - Nếu đã tồn tại: trả lỗi "Tài khoản đã tồn tại, vùi lòng đăng nhập"
      // - Nếu chưa tồn tại: đi tiếp
      const userExists = await models.users.findOne({
         where: {
            email: email,
         },
      });
      if (userExists) {
         res.status(400).json({ message: "Tài khoản đã tồn tại, vùi lòng đăng nhập" });
         return;
      }

      // 3 - Mã hoá password
      const hashPassword = bcrypt.hashSync(pass_word, 10);

      // 4 - Thêm người dùng (CREATE) vào db
      const result = await models.users.create({
         full_name: full_name,
         email: email,
         pass_word: hashPassword,
      });
      console.log({ result: result.toJSON() });

      // 5 - Kiểm tra dữ liệu đổ về có password hay không => xoá password
      const userNew = result.dataValues;
      delete userNew.pass_word;

      // 6. Send mail welcome to new user
      // cấu hình format email welcome
      const welcomeMail = {
         from: process.env.EMAIL_USER,
         to: email,
         subject: "Welcome to Our Website",
         html: `
            <h1>Welcome ${full_name} to Our Website</h1>
         `
      }

      // gửi email
      // param1: dữ liệu email => welcomeMail
      // param2: callback function
      //         + nếu gửi mail thành công thì trả về thông báo 
      //         + nếu gửi mail thất bại thì trả về lỗi
      transporter.sendMail(welcomeMail, (err, info) => {
         if (err) {
            return res.status(500).json({ message: "Gửi mail thất bại" });
         }
         // 7 - Trả dữ liệu đăng ký thành công về lại cho FE
         res.status(200).json(userNew);
      });
   } catch (error) {
      console.log(error);
      res.status(500).json(`Error ${error}`);
   }
};

const login = async (req, res) => {
   try {
      // 1 - Nhận dữ liệu: email, pass_word
      const { email, pass_word } = req.body;
      console.log({ email, pass_word });

      // 2 - Kiểm tra email có tồn tại hay chưa
      //    - Nếu chưa tồn tại: trả lỗi "Email chưa tồn tại vui lòng đăng ký để sử dụng"
      //    - Nếu đã tồn tại: đi tiếp
      const userExists = await models.users.findOne({
         where: {
            email: email,
         },
      });
      if (!userExists) {
         res.status(400).json({ message: "Email chưa tồn tại vui lòng đăng ký để sử dụng" });
         return;
      }
      console.log({ userExists });

      // 2.1 - (Thêm) kiểm tra tk là đăng nhập FB hay GG
      //  - TK đăng nhập bằng FB (chưa có pass): Trả Lỗi "Vui lòng đăng nhập bằng FB để cập nhật mật khẩu"
      if (!userExists.dataValues.pass_word) {
         res.status(400).json({ message: "Không có mật khẩu, Vui lòng đăng nhập bằng FB để cập nhật mật khẩu" });
         return;
      }

      // 3 - Kiểm tra password có hợp lệ hay không
      const isPassword = bcrypt.compareSync(pass_word, userExists.dataValues.pass_word);
      if (!isPassword) {
         res.status(400).json({ message: "Mật khẩu không đúng, vui lòng nhập lại" });
         return;
      }

      // tạo access token cho user
      const payload = {
         userId: userExists.user_id
      }

      // tạo access token
      const accessToken = createAccessToken(payload);

      // 4 - Trả kết quả thành công
      res.status(200).json({
         message: "Đăng nhập thành công",
         token: accessToken
      });
   } catch (error) {
      console.log(error);
      res.status(500).json(`Error ${error}`);
   }
};

export { register, login };
