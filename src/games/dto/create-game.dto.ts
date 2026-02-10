import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Material } from 'generated/prisma/enums';

/**
 * @summary CreateGameDto is a Data Transfer Object used for creating a new game.
 */
export class CreateGameDto {
  /**
   * @summary The name of the toy.
   * @type {string}
   * @example 'Lego Star Wars Millennium Falcon'
   */
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The toy name',
    example: 'Lego Star Wars Millennium Falcon',
  })
  name: string;

  /**
   * @summary The material of the toy.
   * @type {Material} - An enum representing the material of the toy.
   * @example Material.plastic
   */
  @IsNotEmpty()
  @IsEnum(Material)
  @ApiProperty({
    description: 'The toy material',
    enum: Material,
    example: Material.plastic,
  })
  material: Material;

  /**
   * @summary The weight of the toy in kilograms.
   * @type {number}
   * @example 1.5
   */
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The toy weight', example: 1.5 })
  weight: number;
}
