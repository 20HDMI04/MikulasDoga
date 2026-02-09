import { ApiProperty } from '@nestjs/swagger';
import { Material, Games } from 'generated/prisma/client';
import { ChildEntity } from '../../children/entities/child.entity';

export class GameEntity implements Games {
  @ApiProperty({
    description: 'The unique identifier of the game in the database',
    example: 42,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the game',
    example: 'Lego Star Wars Millennium Falcon',
  })
  name: string;

  @ApiProperty({
    description: 'The material of the game',
    enum: Material,
    example: Material.plastic,
  })
  material: Material;

  @ApiProperty({
    description: 'The weight of the game in kilograms',
    example: 1.5,
  })
  weight: number;

  @ApiProperty({
    type: () => ChildEntity,
    isArray: true,
    required: false,
    description: 'The children who receive this game',
  })
  child?: ChildEntity[];
}
