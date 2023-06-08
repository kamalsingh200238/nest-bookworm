import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/createBookmark.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllBookmarks(@Req() req: Request) {
    return this.bookmarkService.getAllBookmarks(req);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBookmark(@Body() dto: CreateBookmarkDto, @Req() req: Request) {
    return this.bookmarkService.createBookmark(dto, req);
  }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // async deleteBookmark(@Req() req: Request) {
  //   return this.bookmarkService.createBookmark();
  // }
}
