import { ApiProperty } from '@nestjs/swagger';
import { Children } from 'generated/prisma/client';
import { GameEntity } from '../../games/entities/game.entity';

/**
 * @summary Represents a child entity in the application, implementing the {@link Children} interface.
 */
export class ChildEntity implements Children {
  /**
   * @summary The unique identifier for the child.
   * @type {number}
   * @example 1
   */
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  /**
   * @summary The name of the child.
   * @type {string}
   * @example "John Doe"
   */
  @ApiProperty({ example: 'John Doe', description: 'The kiddo name' })
  name: string;

  /**
   * @summary The place where the child lives.
   * @type {string}
   * @example "123 Main St, USA"
   */
  @ApiProperty({
    example: '123 Main St, USA',
    description: 'The kiddo exact address, including country',
  })
  address: string;

  /**
   * @summary Indicates whether the child is considered a good kid or not.
   * @type {boolean}
   * @example true
   */
  @ApiProperty({
    example: true,
    description: 'Whether the kid was good or not',
  })
  goodKid: boolean;

  /**
   * @summary The list of games associated with the child.
   * @type {GameEntity[]}
   * @example [{ id: 1, name: 'Lego Star Wars Millennium Falcon', material: 'plastic', weight: 1.5 }]
   */
  @ApiProperty({ type: () => GameEntity, isArray: true, required: false })
  games?: GameEntity[];
}
