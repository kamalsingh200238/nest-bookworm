import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Bookmark } from 'src/bookmark/bookmark.schema';
import { User } from 'src/user/user.schema';

export type FolderDocument = mongoose.HydratedDocument<Folder>;

@Schema({ timestamps: true })
export class Folder {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark' }],
    required: true,
  })
  bookmarks: Bookmark[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
