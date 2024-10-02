import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { GenreRepository } from '../repositories/genre.repository' 
import { CreateGenreDto } from '../models/create-genre.dto'
import { UpdateGenreDto } from '../models/update-genre.dto'

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async create(createGenreDto: CreateGenreDto) {
    try {
      return await this.genreRepository.createGenre(createGenreDto)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar gênero de livro!')
    }
  }

  async findAll() {
    try {
      return await this.genreRepository.findAllGenres()
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar gêneros de livros!',
      )
    }
  }

  async findOne(id: string) {
    try {
      const genre = await this.genreRepository.findGenreById(id)
      if (!genre) {
        throw new NotFoundException('Gênero de livro não encontrado')
      }
      return genre
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar gênero de livro pelo ID!',
      )
    }
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    try {
      return await this.genreRepository.updateGenre(id, updateGenreDto)
    } catch (error) {
      throw new BadRequestException(
        'Dados inválidos para atualização do gênero de livro!',
      )
    }
  }

  async remove(id: string) {
    try {
      return await this.genreRepository.deleteGenre(id)
    } catch (error) {
      throw new NotFoundException(
        'Gênero de livro não encontrado para remoção!',
      )
    }
  }
}
