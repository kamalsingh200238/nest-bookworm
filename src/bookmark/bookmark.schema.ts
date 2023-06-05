import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
import { Folder } from 'src/folder/folder.schema';

export type BookmarkDocument = mongoose.HydratedDocument<Bookmark>;

@Schema({ timestamps: true })
export class Bookmark {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true })
  folder: Folder;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
