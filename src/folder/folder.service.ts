import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
}
