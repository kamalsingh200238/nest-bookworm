import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderModule } from 'src/folder/folder.module';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FolderModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
