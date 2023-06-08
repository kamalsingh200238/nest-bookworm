import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookmarkDocument } from 'src/bookmark/bookmark.schema';
import { Folder } from './folder.schema';

@Injectable()
export class FolderService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  async createDefaultFolder(userId: Types.ObjectId) {
    const defaultFolder = await this.folderModel.create({
      name: 'default',
      user: userId,
      bookmarks: [],
    });
    return defaultFolder;
  }

  async getAllBookmarks(userId: Types.ObjectId) {
    const bookmarks = await this.folderModel
      .find({ user: userId })
      .populate('bookmarks')
      .exec();
    console.log({ bookmarks });
    return bookmarks;
  }

  async pushBookmarkInFolder(
    folderId: Types.ObjectId,
    bookmarkId: Types.ObjectId,
  ) {
    await this.folderModel
      .findByIdAndUpdate(
        folderId,
        { $push: { bookmarks: bookmarkId } },
        { new: true },
      )
      .exec();
  }
}
