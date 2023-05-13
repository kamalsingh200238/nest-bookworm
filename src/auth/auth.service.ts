import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signUp(signUpDto: SignUpDto) {
    await this.userService.createNewUser(signUpDto);
    return { signUpDto };
    // add the user in the database
    // generate jwt token
    // set the token in the cookie
    // return the data (only id, username, email)
  }
}
