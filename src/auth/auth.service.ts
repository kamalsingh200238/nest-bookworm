import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return 'you are now registered';
  }

  signin() {
    return 'you are now signedin';
  }
}
