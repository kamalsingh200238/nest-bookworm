import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/createBookmark.dto';
import { UpdateBookmarkDto } from './dto/updateBookmark.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllBookmarks(@Req() req: Request) {
    return this.bookmarkService.getAllBookmarks(req);
  }

  // Create a bookmark
  @Post()
  @UseGuards(JwtAuthGuard)
  async createBookmark(@Body() dto: CreateBookmarkDto, @Req() req: Request) {
    return this.bookmarkService.createBookmark(dto, req);
  }

  // edit a bookmark
  @Patch('/:bookmarkId')
  @UseGuards(JwtAuthGuard)
  async editBookmark(
    @Param("bookmarkId") bookmarkId: string,
    @Body() dto: UpdateBookmarkDto,
    @Req() req: Request,
  ) {
    return this.bookmarkService.editBookmark(bookmarkId, dto, req);
  }

  // delete a bookmark
  @Delete('/:bookmarkId')
  @UseGuards(JwtAuthGuard)
  async deleteBookmark(
    @Param("bookmarkId") bookmarkId: string,
    @Req() req: Request,
  ) {
    return this.bookmarkService.deleteBookmark(bookmarkId, req);
  }
}
