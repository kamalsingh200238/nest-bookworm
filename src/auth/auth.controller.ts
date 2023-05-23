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
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    this.authService.signUpUser(signUpDto, res);
  }

  @Post('login')
  async login(@Body() logInDto: LogInDto, @Res() res: Response) {
    this.authService.logInUser(logInDto, res);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async hello(@Req() req: Request) {
    const { user } = req;
    return { user, isWorking: 'yeaah' };
  }
}
