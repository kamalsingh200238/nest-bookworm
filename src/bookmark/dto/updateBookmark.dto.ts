import { IsMongoId, IsNotEmpty, IsUrl } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateBookmarkDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsMongoId()
  folderId: Types.ObjectId;
}
