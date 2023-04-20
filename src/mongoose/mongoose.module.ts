import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bookmark_mate_nest_mongodb'),
  ],
})
export class MongooseConfigModule { }
