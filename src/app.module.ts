import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigModule } from './mongoose/mongoose.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [MongooseConfigModule, UserModule, AuthModule, BookmarkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
