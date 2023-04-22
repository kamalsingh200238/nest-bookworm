import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/register')
  register() {
    return this.authService.register();
  }

  @Get('/signin')
  signin() {
    return this.authService.signin();
  }
}
