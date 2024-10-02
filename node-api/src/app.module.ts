import { Module } from '@nestjs/common'
import { BookController } from './controllers/book.controller'
import { BookService } from './services/book.service'
import { GenreController } from './controllers/genre.controller'
import { GenreService } from './services/genre.service'
import { PrismaService } from './config/prisma.service'
import { BookRepository } from './repositories/book.repository'
import { GenreRepository } from './repositories/genre.repository'

@Module({
  imports: [],
  controllers: [BookController, GenreController],
  providers: [
    BookService,
    BookRepository,
    GenreService,
    GenreRepository,
    PrismaService,
  ],
})
export class AppModule {}
