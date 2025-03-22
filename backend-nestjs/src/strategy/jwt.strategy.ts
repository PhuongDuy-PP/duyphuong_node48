// module này dùng để verify token
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// Bearer token

@Injectable()
export class JwtStrategy extends
    PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "node48",
        });
    }
    async validate(payload: any) {
        return payload;
    }
}