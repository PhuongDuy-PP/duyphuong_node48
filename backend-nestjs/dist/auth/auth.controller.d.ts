import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/email/email.service';
export declare class AuthController {
    private readonly authService;
    private readonly emailService;
    constructor(authService: AuthService, emailService: EmailService);
    login(body: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    create(createAuthDto: CreateAuthDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): string;
    sendEmail(res: Response): Promise<Response<any, Record<string, any>>>;
}
