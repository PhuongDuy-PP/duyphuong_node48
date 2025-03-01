import { createAccessToken, createRefreshToken } from "../config/jwt.js";
import transporter from "../config/transporter.js";
import connect from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";
import crypto from "crypto"; // lib để tạo code forgot password
import { sendMailForgotPassword } from "../utils/sendMail.js";
import {PrismaClient} from '@prisma/client';

const models = initModels(connect);
const prisma = new PrismaClient();

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

      // tạo refresh token
      const refreshToken = createRefreshToken(payload);

      // lưu refresh token vào db
      await prisma.users.update({
         where: {
            user_id: userExists.user_id
         },
         data: {
            refresh_token: refreshToken
         }
      });

      // gắn refresh token cho cookie của response
      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         secure: false, // true: chỉ gửi cookie qua https, false: gửi qua http
         sameSite: 'Lax', // đảm bảo cookie được gửi trong nhiều domain
         maxAge: 7*24*60*60*1000 // 7 ngày
      })

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

// define forgotPassword controller
const forgotPassword = async (req, res) => {
   try {
      let {email} = req.body;

      // kiểm tra email có tồn tại trong db hay không
      let userExists = await models.users.findOne({
         where: {
            email
         }
      });

      // TH1: email không tồn tại trong db
      if(!userExists) {
         return res.status(400).json({message: "Email không tồn tại trong hệ thống"});
      }

      // TH2: email tồn tại trong db
      // tạo code forgot password, lưu vào db và gửi mail cho user
      let code = crypto.randomBytes(6).toString("hex");
      let mailForgotPass = {
         from: process.env.EMAIL_USER,
         to: email,
         subject: "Code xác thực",
         html: `
            <h1>${code}</h1>
         `
      }

      // lưu vào db
      // nếu user gửi 10 request forgot password thì chỉ lấy
      // code mới nhất
      let codeForgotPassExists = await models.forgot_password_code.findOne({
         where: {
            user_id: userExists.user_id
         }
      });

      if (codeForgotPassExists) {
         // update code forgot password mới nhất
         // set lại thời gian expired của code mới
         let expired = new Date(new Date().getTime() + 2*60*60*1000); // expired sau 2h
         await models.forgot_password_code.update({
            forgot_code: code,
            expired: expired
         }, {
            where: {
               user_id: userExists.user_id
            }
         });

         // send mail
         return sendMailForgotPassword(res, transporter, mailForgotPass);
      } else {
         let expired = new Date(new Date().getTime() + 2*60*60*1000); // expired sau 2h
         await models.forgot_password_code.create({
            user_id: userExists.user_id,
            forgot_code: code,
            expired: expired
         });
         return sendMailForgotPassword(res, transporter, mailForgotPass);
      }
   } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error API forgotPassword"});
   }

}

// define controller change password
const resetPassword = async (req, res) => {
   try {
      // newPassword, code
      let {newPassword, code, email} = req.body;

      // kiểm tra email có tồn tại trong db hay không
      let userExists = await models.users.findOne({
         where: {email}
      });

      // TH1: email không tồn tại trong db
      if(!userExists) {
         return res.status(400).json({message: "Email không tồn tại trong hệ thống"});
      };

      // TH2: code có tồn tại trong db hay không
      let codeExists = await models.forgot_password_code.findOne({
         where: {
            user_id: userExists.user_id,
            forgot_code: code
         }
      });

      if(!codeExists) {
         return res.status(400).json({message: "Code không hợp lệ"});
      };

      // mã hóa new password
      let hashNewPassword = bcrypt.hashSync(newPassword, 10);
      // C1: dùng trực tiếp userExists để update
      // userExists.pass_word = hashNewPassword;
      // await userExists.save();

      // C2: dùng model để update
      await models.users.update({
         pass_word: hashNewPassword
      }, {
         where: {
            user_id: userExists.user_id
         }
      });

      // xóa code trong db
      await models.forgot_password_code.destroy({
         where: {
            user_id: userExists.user_id
         }
      });

      return res.status(200).json({message: "Đổi mật khẩu thành công"});
   } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error API resetPassword"});
   }
}

const loginFacebook =  async (req, res) => {
   try {
      // 1 - Nhận dữ liệu: email, id, name của facebook
      let {id, email, name} = req.body;

      // 2 - Kiểm tra email có tồn tại trong db hay không
      let userExist = await models.users.findOne({
         where: {email}
      });

      // TH1: email không tồn tại trong db
      // tạo user mới
      // send mail welcome
      // tạo access token,
      // trả về cho FE
      if (!userExist) {
         let newUser = await models.users.create({
            full_name: name,
            email,
            pass_word: " ",
            face_app_id: id
         });
         const mailOption = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Our Website",
            html: `
               <h1>Welcome ${name} to Our Website</h1>
            `
         }
         return transporter.sendMail(mailOption, (err, info) => {
            if(err) {
               return res.status(500).json({message: "Gửi mail thất bại"});
            }

            // tạo access token cho user
            let payload = {
               userId: newUser.user_id
            }
            let accessToken = createAccessToken(payload);
            return res.status(200).json({message: "Đăng nhập thành công", token: accessToken});
         })
      }

      // TH2: email đã tồn tại trong db
      // kiểm tra user có face_app_id hay không
      // nếu có thì trả về access token
      // nếu không thì báo lỗi, yêu cầu đăng nhập bằng email
      if(!userExist.face_app_id) {
         return res.status(400).json({message: "Vui lòng đăng nhập bằng email"});
      }

      // tạo access token cho user
      let payload = {
         userId: userExist.user_id
      }
      let accessToken = createAccessToken(payload);
      return res.status(200).json({message: "Đăng nhập thành công", token: accessToken});
   } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error API loginFacebook"});
   }
}

const extendToken = async (req, res) => {
   try {
      // B1: lấy refreshToken từ cookie
      let refreshToken = req.cookies.refreshToken;
      console.log("refreshToken: ", refreshToken);

      // B2: kiểm tra refreshToken có giá trị hay không
      if(!refreshToken) {
         return res.status(401).json({message: "Unauthorized"});
      }

      // B3: kiểm tra refreshToken có matching với db hay không
      let user = await prisma.users.findFirst({
         where: {
            refresh_token: refreshToken
         }
      });

      if(!user) {
         return res.status(401).json({message: "Unauthorized"});
      }

      // kiểm tra refreshToken có hết hạn hay không => to be continue

      // tạo access token mới cho user
      let payload = {
         userId: user.user_id
      }
      let newAccessToken = createAccessToken({payload});
      return res.status(200).json({message: "Extend token success", token: newAccessToken});
   } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error API extendToken"});
   }
}

export { register, login, forgotPassword, resetPassword, loginFacebook, extendToken };
