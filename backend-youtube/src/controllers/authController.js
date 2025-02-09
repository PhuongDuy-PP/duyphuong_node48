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

      // 6 - Trả dữ liệu đăng ký thành công về lại cho FE
      res.status(200).json(userNew);
   } catch (error) {
      console.log(error);
      res.status(500).json(`Error ${error}`);
   }
};

export { register };
