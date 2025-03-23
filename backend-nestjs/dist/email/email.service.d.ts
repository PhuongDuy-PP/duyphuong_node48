import { ConfigService } from "@nestjs/config";
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, text: string, html?: string): Promise<any>;
}
