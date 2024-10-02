import { Injectable } from '@nestjs/common'
import { PrismaService } from '../config/prisma.service'

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  createBook(data: any) {
    return this.prisma.book.create({ data })
  }

  findAllBooks() {
    return this.prisma.book.findMany()
  }

  findBookById(id: string) {
    return this.prisma.book.findUnique({ where: { id } })
  }

  updateBook(id: string, data: any) {
    return this.prisma.book.update({ where: { id }, data })
  }

  deleteBook(id: string) {
    return this.prisma.book.delete({ where: { id } })
  }
}
