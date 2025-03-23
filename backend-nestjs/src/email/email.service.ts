import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport, Transporter } from "nodemailer";

@Injectable()
export class EmailService {
    private transporter: Transporter;

    // hàm khởi tạo
    constructor(private configService: ConfigService){
        this.transporter = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: this.configService.get<string>("EMAIL_USER"),
                pass: this.configService.get<string>("EMAIL_PASS"),
            }
        })
    }

    async sendEmail(to: string, subject: string, text: string, html?: string) {
        try {
            const optionEmail = {
                from: this.configService.get<string>("EMAIL_USER"),
                to,
                subject,
                text,
                html
            }
            return await this.transporter.sendMail(optionEmail);
        } catch (error) {
            throw new Error("Error sending email");
        }
    }
}