import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { LogInDto } from './dto/logIn.dto';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async generateJwtToken(user: UserDocument) {
    // payload for jwt token
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };
    const token = this.jwtService.sign(payload); // generate token
    return token;
  }

  async validateUser(logInDto: LogInDto, res: Response) {
    const { email, password } = logInDto;
    const user = await this.userService.findByEmail(email);
    // if the user does not exist
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = await this.generateJwtToken(user);
    res.cookie('token', token);
    res.send({
      message: 'login successfull',
      token: token,
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  }
}
