import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes} from 'mongoose';
import { User } from 'src/user/user.schema';
import { Folder } from './folder.schema';

export type BookmarkDocument = HydratedDocument<Bookmark>;

@Schema()
export class Bookmark {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  description: string;
  
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Folder', required: true })
  folder: Folder;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
