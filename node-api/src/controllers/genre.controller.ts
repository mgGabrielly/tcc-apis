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
} from '@nestjs/common'
import { GenreService } from '../services/genre.service'
import { CreateGenreDto } from '../models/create-genre.dto'
import { UpdateGenreDto } from '../models/update-genre.dto'

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    try {
      const genre = await this.genreService.create(createGenreDto)
      return { statusCode: HttpStatus.CREATED, genre }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  async findAll() {
    try {
      const genres = await this.genreService.findAll()
      return { statusCode: HttpStatus.OK, genres }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const genre = await this.genreService.findOne(id)
      if (!genre) {
        throw new HttpException('Gênero não encontrado', HttpStatus.NOT_FOUND)
      }
      return genre
    } catch (error) {
      if (error.message === 'Gênero não encontrado') {
        throw new HttpException('Gênero não encontrado', HttpStatus.NOT_FOUND)
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    try {
      const updatedGenre = await this.genreService.update(id, updateGenreDto)
      return { statusCode: HttpStatus.OK, updatedGenre }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.genreService.remove(id)
      return { statusCode: HttpStatus.NO_CONTENT }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
