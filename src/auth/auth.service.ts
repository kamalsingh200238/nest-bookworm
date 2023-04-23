import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(dto: AuthDto) {
    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  signin() {
    return 'you are now signedin';
  }
}
