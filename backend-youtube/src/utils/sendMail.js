import dotenv from 'dotenv';

dotenv.config();

export const sendMailForgotPassword = (res, transporter, mailOption) => {
    return transporter.sendMail(mailOption, (err, info) => {
        if (err) {
           return res.status(500).json({message: "Gửi mail thất bại"});
        }
        return res.status(200).json({message: "Gửi mail thành công"});
     })
}