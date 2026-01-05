import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Material } from 'generated/prisma/enums';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Material)
  material: Material;

  @IsNotEmpty()
  @IsNumber()
  weight: number;
}
