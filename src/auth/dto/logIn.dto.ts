import { IsNotEmpty } from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
