import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { FolderService } from 'src/folder/folder.service';
import { UserDocument } from 'src/user/user.schema';
import { Bookmark } from './bookmark.schema';
import { CreateBookmarkDto } from './dto/createBookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<Bookmark>,
    private folderService: FolderService,
  ) {}

  async createBookmark(dto: CreateBookmarkDto, req: Request) {
    const { name, url, folderId } = dto;
    const user = req.user as UserDocument;
    const bookmark = await this.bookmarkModel.create({
      name,
      url,
      folder: folderId,
      user: user._id,
    });
    await this.folderService.pushBookmarkInFolder(folderId, bookmark._id)
    return bookmark;
  }

  async getAllBookmarks(req: Request) {
    const user = req.user as UserDocument;
    const bookmarks = this.folderService.getAllBookmarks(user._id);
    return bookmarks;
  }
}
