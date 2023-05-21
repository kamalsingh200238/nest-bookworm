import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const { username, email, password } = signUpDto;

    // create new user
    const user = await this.userService.createNewUser({
      username,
      email,
      password,
    });

    // create jwt token
    const jwtToken = await this.authService.generateJwtToken(user);

    // send the cookie in jwt token
    res.cookie('token', jwtToken);

    res.send({ userId: user._id, username: user.username, email: user.email });
  }

  @Post('login')
  async login(@Body() logInDto: LogInDto, @Res() res: Response) {
    return this.authService.validateUser(logInDto, res);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async hello(@Req() req: Request) {
    const { user } = req;
    return { user, isWorking: 'yeaah' };
  }
}
