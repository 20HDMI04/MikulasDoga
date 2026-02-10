import { ApiProperty } from '@nestjs/swagger';
import { Material, Games } from 'generated/prisma/client';
import { ChildEntity } from '../../children/entities/child.entity';

/**
 * @summary GameEntity is a class that represents the structure of a game entity in the application.
 */
export class GameEntity implements Games {
  /**
   * @summary The unique identifier of the game in the database.
   * @type {number}
   * @example 42
   */
  @ApiProperty({
    description: 'The unique identifier of the game in the database',
    example: 42,
  })
  id: number;

  /**
   * @summary The name of the game.
   * @type {string}
   * @example 'Lego Star Wars Millennium Falcon'
   */
  @ApiProperty({
    description: 'The name of the game',
    example: 'Lego Star Wars Millennium Falcon',
  })
  name: string;

  /**
   * @summary The material of the game.
   * @type {Material} - An enum representing the material of the game.
   * @example Material.plastic
   */
  @ApiProperty({
    description: 'The material of the game',
    enum: Material,
    example: Material.plastic,
  })
  material: Material;

  /**
   * @summary The weight of the game in kilograms.
   * @type {number}
   * @example 1.5
   */
  @ApiProperty({
    description: 'The weight of the game in kilograms',
    example: 1.5,
  })
  weight: number;

  /**
   * @summary The children who receive this game.
   * @type {ChildEntity[]} - An array of ChildEntity objects representing the children who receive this game.
   * @example [{ id: 1, name: 'John Doe', address: '123 Main St, USA', goodKid: true }]
   */
  @ApiProperty({
    type: () => ChildEntity,
    isArray: true,
    required: false,
    description: 'The children who receive this game',
  })
  child?: ChildEntity[];
}
