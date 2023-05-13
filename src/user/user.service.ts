import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
 constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createNewUser(signUpDto: SignUpDto){
    const user = new this.userModel(signUpDto)
    return user.save()
  }
}
