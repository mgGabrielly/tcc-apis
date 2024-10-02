import { IsNotEmpty, IsString, IsInt, IsUUID } from 'class-validator'

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  author: string

  @IsNotEmpty()
  @IsInt()
  year: number

  @IsNotEmpty()
  @IsInt()
  numberPages: number

  @IsNotEmpty()
  @IsUUID()
  genreId: string
}
