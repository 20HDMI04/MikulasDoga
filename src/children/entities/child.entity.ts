import { ApiProperty } from '@nestjs/swagger';
import { Children } from 'generated/prisma/client';
import { GameEntity } from '../../games/entities/game.entity';

export class ChildEntity implements Children {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'The kiddo name' })
  name: string;

  @ApiProperty({
    example: '123 Main St, USA',
    description: 'The kiddo exact address, including country',
  })
  address: string;

  @ApiProperty({
    example: true,
    description: 'Whether the kid was good or not',
  })
  goodKid: boolean;

  @ApiProperty({ type: () => GameEntity, isArray: true, required: false })
  games?: GameEntity[];
}
