import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

/**
 * @summary DTO for creating a child entity
 * @description This DTO defines the structure of the data required to create a new child entity. It includes validation rules to ensure that the data is in the correct format and meets the necessary requirements.
 */
export class CreateChildDto {
  /**
   * @summary The name of the kid.
   * @type {string}
   * @example John Doe
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The kiddo name', example: 'John Doe' })
  name: string;

  /**
   * @summary The place where the kid lives.
   * @type {string}
   * @example 123 Main St, Springfield, USA
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The kiddo exact address, including country',
    example: '123 Main St, Springfield, USA',
  })
  address: string;
  /**
   * @summary Whether the kid was good or not.
   * @type {boolean}
   * @example true
   */
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Whether the kid was good or not',
    example: true,
  })
  goodKid: boolean;
}
