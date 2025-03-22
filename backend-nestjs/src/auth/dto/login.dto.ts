import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, {message: 'Invalid email format'})
    @ApiProperty()
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @ApiProperty()
    pass_word: string;
}