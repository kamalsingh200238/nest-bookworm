import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwtToken(user: UserDocument) {
    // payload for jwt token
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    // generate token
    const token = this.jwtService.sign(payload);

    return token;
  }
}
