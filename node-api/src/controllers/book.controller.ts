import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import { BookService } from '../services/book.service'
import { CreateBookDto } from '../models/create-book.dto'
import { UpdateBookDto } from '../models/update-book.dto'

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    try {
      const book = await this.bookService.create(createBookDto)
      return { statusCode: HttpStatus.CREATED, book }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.bookService.findAll()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const book = await this.bookService.findOne(id)
      if (!book) {
        throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND)
      }
      return book
    } catch (error) {
      if (error.message === 'Livro não encontrado') {
        throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND)
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      const updatedBook = await this.bookService.update(id, updateBookDto)
      return { statusCode: HttpStatus.OK, updatedBook }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.bookService.remove(id)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
