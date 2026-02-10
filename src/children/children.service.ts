import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

/**
 * @summary ChildrenService is a service class that provides methods for managing children in the application. It interacts with the database through PrismaService to perform CRUD operations on child entities, as well as managing the association between children and games.
 */
@Injectable()
export class ChildrenService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   *
   * @summary Creates a new child record in the database.
   * @param {@link CreateChildDto} createChildDto
   * @returns The created child record.
   * @throws {@link ConflictException} If a child with the same unique data already exists.
   * @throws {@link InternalServerErrorException} If there is an error during the creation process.
   */
  async create(createChildDto: CreateChildDto) {
    try {
      return await this.prisma.children.create({
        data: createChildDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Child with this data already exists');
      }
      console.error('Error creating child:', error);
      throw new InternalServerErrorException('Failed to create child.');
    }
  }

  /**
   * @summary Retrieves all child records from the database, including their associated games.
   * @returns An array of child records with their associated games.
   * @throws {@link InternalServerErrorException} If there is an error during the retrieval process.
   */
  async findAll() {
    try {
      return await this.prisma.children.findMany({
        include: { games: true },
      });
    } catch (error) {
      console.error('Error finding all children:', error);
      throw new InternalServerErrorException('Failed to fetch children.');
    }
  }

  /**
   *
   * @summary Retrieves a single child record by its unique identifier, including its associated games.
   * @param {@link number} id - The unique identifier of the child to retrieve.
   * @returns {@link Children} - The child record with the specified ID, including its associated games.
   * @throws {@link NotFoundException} If a child with the specified ID is not found in the database.
   * @throws {@link InternalServerErrorException} If there is an error during the retrieval process.
   */
  async findOne(id: number) {
    try {
      return await this.prisma.children.findUniqueOrThrow({
        where: { id },
        include: { games: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Child with ID ${id} not found`);
      }
      console.error('Error finding child:', error);
      throw new InternalServerErrorException(
        `Failed to find child with ID ${id}.`,
      );
    }
  }

  /**
   * @summary Updates a child record by its unique identifier.
   * @param {@link number} id - The unique identifier of the child to update.
   * @param {@link UpdateChildDto} updateChildDto - The data to update the child with.
   * @returns The updated child record.
   * @throws {@link ConflictException} If a child with the same unique data already exists.
   * @throws {@link NotFoundException} If a child with the specified ID is not found.
   * @throws {@link InternalServerErrorException} If there is an error during the update process.
   */
  async update(id: number, updateChildDto: UpdateChildDto) {
    try {
      return await this.prisma.children.update({
        where: { id },
        data: updateChildDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Child with this data already exists');
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Child with ID ${id} not found`);
      }
      console.error('Error updating child:', error);
      throw new InternalServerErrorException(
        `Failed to update child with ID ${id}.`,
      );
    }
  }

  /**
   * @summary Removes a child record by its unique identifier.
   * @param {@link number} id - The unique identifier of the child to remove.
   * @returns {@link Children} - The removed child record.
   * @throws {@link NotFoundException} If a child with the specified ID is not found in the database.
   * @throws {@link InternalServerErrorException} If there is an error during the removal process.
   */
  async remove(id: number) {
    try {
      return await this.prisma.children.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Child with ID ${id} not found`);
      }
      console.error('Error removing child:', error);
      throw new InternalServerErrorException(
        `Failed to remove child with ID ${id}.`,
      );
    }
  }

  /**
   * @summary Adds a game to a child's list of associated games.
   * @param {@link number} childId - The unique identifier of the child.
   * @param {@link number} gameId - The unique identifier of the game to add.
   * @returns The updated child record with the newly associated game.
   * @throws {@link NotFoundException} If the child or game is not found.
   * @throws {@link InternalServerErrorException} If there is an error during the process.
   */
  async addGameToChild(childId: number, gameId: number) {
    try {
      return await this.prisma.children.update({
        where: { id: childId },
        data: {
          games: {
            connect: { id: gameId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Child or Game not found`);
      }
      console.error('Error adding game to child:', error);
      throw new InternalServerErrorException('Failed to add game to child.');
    }
  }

  /**
   *
   * @summary Removes a game from a child's list of associated games.
   * @param {@link number} childId - The unique identifier of the child.
   * @param {@link number} gameId - The unique identifier of the game to remove.
   * @returns The updated child record with the game removed.
   * @throws {@link NotFoundException} If the child or game is not found.
   * @throws {@link InternalServerErrorException} If there is an error during the process.
   */
  async removeGameFromChild(childId: number, gameId: number) {
    try {
      return await this.prisma.children.update({
        where: { id: childId },
        data: {
          games: {
            disconnect: { id: gameId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Child or Game not found`);
      }
      console.error('Error removing game from child:', error);
      throw new InternalServerErrorException(
        'Failed to remove game from child.',
      );
    }
  }
}
