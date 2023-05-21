import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createNewUser(userInfo: User) {
    const { username, email, password } = userInfo;
    // check if the user already exists
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      // if user exist then send bad request error
      throw new BadRequestException('User already exist, use different email');
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    return await user.save();
  }
}
