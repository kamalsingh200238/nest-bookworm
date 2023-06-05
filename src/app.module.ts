import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigModule } from './mongoose/mongoose.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FoldersModule } from './folders/folders.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [
    MongooseConfigModule,
    UserModule,
    AuthModule,
    FoldersModule,
    BookmarksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
