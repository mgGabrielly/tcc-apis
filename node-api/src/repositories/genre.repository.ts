import { Injectable } from '@nestjs/common'
import { PrismaService } from '../config/prisma.service'

@Injectable()
export class GenreRepository {
  constructor(private readonly prisma: PrismaService) {}

  createGenre(data: any) {
    return this.prisma.genre.create({ data })
  }

  findAllGenres() {
    return this.prisma.genre.findMany()
  }

  findGenreById(id: string) {
    return this.prisma.genre.findUnique({ where: { id } })
  }

  updateGenre(id: string, data: any) {
    return this.prisma.genre.update({ where: { id }, data })
  }

  deleteGenre(id: string) {
    return this.prisma.genre.delete({ where: { id } })
  }
}
