import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { FolderService } from 'src/folder/folder.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private folderService: FolderService,
  ) {}

  async createNewUser(userInfo: User) {
    const { username, email, password } = userInfo;
    // check if the user already exists
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      // if user exist then send bad request error
      throw new BadRequestException('User already exist, use different email');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hash the password

    // create new user
    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // create default folder
    const defaultFolder = this.folderService.createDefaultFolder(user._id)
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
