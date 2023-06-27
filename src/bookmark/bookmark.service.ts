import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model, Types } from 'mongoose';
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

  async getAllBookmarks(req: Request) {
    const user = req.user as UserDocument;
    const bookmarks = this.folderService.getAllBookmarks(user._id);
    return bookmarks;
  }

  async createBookmark(dto: CreateBookmarkDto, req: Request) {
    const { name, url, folderId } = dto;
    const user = req.user as UserDocument;
    const bookmark = await this.bookmarkModel.create({
      name,
      url,
      folderId: folderId,
      userId: user._id,
    });
    /*
     * Now push the bookmark's Id inside the folder it was created in
     * For example,
     * Let's say Bookmark x was created in a folder called y.
     * After creating the bookmark we push the id of x inside the bookmarks array of folder y
     */
    await this.folderService.pushBookmarkInFolder(folderId, bookmark._id);
    return bookmark;
  }

  async editBookmark(bookmarkId: string, dto: CreateBookmarkDto, req: Request) {
    const { name, url, folderId } = dto;
    const user = req.user as UserDocument;
    const bookmark = await this.bookmarkModel.findById(bookmarkId);
    if (!bookmark) {
      // check if bookmark exist
      throw new NotFoundException('Bookmark does not exist');
    }
    console.log({ bookmark, user });
    if (!bookmark.userId.equals(user._id)) {
      // check if user owns the bookmark
      throw new UnauthorizedException(
        'You are not authorized to update this bookmark',
      );
    }
    // update bookmark
    const updatedBookmark = await this.bookmarkModel.findByIdAndUpdate(
      bookmarkId,
      { name, url, folderId, userId: user._id },
      { new: true },
    );
    if (!updatedBookmark) {
      // if bookmark is not updated
      throw new InternalServerErrorException(
        'And error occured while updating the bookmark',
      );
    }
    return updatedBookmark;
  }

  async deleteBookmark(bookmarkId: string, req: Request) {
    const user = req.user as UserDocument;
    const bookmark = await this.bookmarkModel.findById(bookmarkId);
    if (!bookmark) {
      // check if bookmark exist
      throw new NotFoundException('Bookmark does not exist');
    }
    console.log({ bookmarkId, user: user._id, bookmark: bookmark.userId });
    if (!bookmark.userId.equals(user._id)) {
      console.log('this is running');
      // check if user owns the bookmark
      throw new UnauthorizedException(
        'You are not authorized to delele this bookmark',
      );
    }
    // delete the bookmark
    const deletedBookmark = await this.bookmarkModel.findByIdAndDelete(
      bookmarkId,
    );
    // remove the bookmark from its respective folder
    await this.folderService.pullBookmarkFromFolder(
      deletedBookmark.folderId,
      deletedBookmark._id,
    );
    return deletedBookmark;
  }
}
