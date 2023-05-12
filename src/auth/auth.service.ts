import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  signUp(singUpDto: SignUpDto) {
    return { singUpDto };
  }
}
