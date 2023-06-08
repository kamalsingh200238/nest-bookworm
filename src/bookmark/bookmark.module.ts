import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderModule } from 'src/folder/folder.module';
import { BookmarkController } from './bookmark.controller';
import { Bookmark, BookmarkSchema } from './bookmark.schema';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
    FolderModule
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
