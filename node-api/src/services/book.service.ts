import { Injectable } from '@nestjs/common'
import { BookRepository } from '../repositories/book.repository'
import { CreateBookDto } from '../models/create-book.dto'
import { UpdateBookDto } from '../models/update-book.dto'

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async create(createBookDto: CreateBookDto) {
    try {
      return await this.bookRepository.createBook(createBookDto)
    } catch (error) {
      throw new Error('Erro ao criar livro!')
    }
  }

  async findAll() {
    try {
      return await this.bookRepository.findAllBooks()
    } catch (error) {
      throw new Error('Erro ao buscar livros!')
    }
  }

  async findOne(id: string) {
    try {
      const book = await this.bookRepository.findBookById(id)
      if (!book) {
        throw new Error('Livro não encontrado')
      }
      return book
    } catch (error) {
      throw new Error('Erro ao buscar livro pelo ID!')
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      return await this.bookRepository.updateBook(id, updateBookDto)
    } catch (error) {
      throw new Error('Erro ao atualizar livro!')
    }
  }

  async remove(id: string) {
    try {
      return await this.bookRepository.deleteBook(id)
    } catch (error) {
      throw new Error('Erro ao remover livro!')
    }
  }
}
