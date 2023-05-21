import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userSerice: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies.token,
      ]),
      secretOrKey: 'this-is-secret', // TODO: jwt secret from process file
    });
  }

  async validate(payload: any) {
    const { userId } = payload;
    const user = await this.userSerice.findById(userId);
    // if user is not present
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    return user;
  }
}
