import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator'

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  author?: string

  @IsOptional()
  @IsInt()
  year?: number

  @IsOptional()
  @IsInt()
  numberPages?: number

  @IsOptional()
  @IsUUID()
  genreId?: string
}
