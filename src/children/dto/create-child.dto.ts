import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

/*
A gyerekekről tárolandó adatok:
Név
Pontos cím (országgal együtt)
Jó volt-e vagy sem
*/
export class CreateChildDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The kiddo name', example: 'John Doe' })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The kiddo exact address, including country',
    example: '123 Main St, Springfield, USA',
  })
  address: string;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Whether the kid was good or not',
    example: true,
  })
  goodKid: boolean;
}
