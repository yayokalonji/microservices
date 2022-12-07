import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Req } from '@nestjs/common';
import { ParseObjectIdPipe } from '../utilities/parse-object-id-pipe';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('books')
@ApiTags('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(@Req() request: Request) {
    return this.booksService.findAll(request);
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.booksService.remove(id);
  }

  @Post(':id/comment')
  async addComment(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() comment: CreateCommentDto,
  ) {
    return this.booksService.addComment(id, comment);
  }
}
