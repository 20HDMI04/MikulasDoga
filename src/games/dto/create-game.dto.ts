import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Material } from 'generated/prisma/enums';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The toy name',
    example: 'Lego Star Wars Millennium Falcon',
  })
  name: string;

  @IsNotEmpty()
  @IsEnum(Material)
  @ApiProperty({
    description: 'The toy material',
    enum: Material,
    example: Material.plastic,
  })
  material: Material;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The toy weight', example: 1.5 })
  weight: number;
}
