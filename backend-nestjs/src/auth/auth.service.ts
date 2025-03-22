import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'; // lib bcrypt cũ
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ){}

  async login(body: LoginDto): Promise<any> {
    const {email, pass_word} = body;
    const user = await this.prisma.users.findFirst({
      where: {email}
    })
    if(!user) {
      throw new Error('User not found');
    }

    // check password
    const checkPass = bcrypt.compareSync(pass_word, user.pass_word);
    if(!checkPass) {
      throw new Error('Password is incorrect');
    }

    // log value TEST trong .env
    console.log('TEST:', this.configService.get('TEST'));

    // tạo token
    const token = this.jwtService.sign(
      {data: {userId: user.user_id}}, // define payload muốn lưu vào token
      {
        expiresIn: '1h', // thời gian hết hạn của token
        secret: 'node48' // key bí mật để mã hóa 
      }
    )

    return token;
  }


  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
