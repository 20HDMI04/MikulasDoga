import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';

/**
 * @summary GamesService is a service class that provides methods for managing games in the application. It interacts with the database through PrismaService to perform CRUD operations on game entities.
 */
@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * @summary Creates a new game in the database using the provided data transfer object.
   * @param {@link CreateGameDto} createGameDto - The data transfer object containing the information needed to create a new game.
   * @returns The newly created game entity.
   * @throws {@link ConflictException} If a game with the same data already exists in the database.
   * @throws {@link InternalServerErrorException} If there is an error while creating the game in the database.
   */
  async create(createGameDto: CreateGameDto) {
    try {
      return await this.prisma.games.create({
        data: createGameDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Game with this data already exists');
      }
      console.error('Error creating game:', error);
      throw new InternalServerErrorException('Failed to create game.');
    }
  }

  /**
   * @summary Retrieves all game entities from the database.
   * @returns An array of all game entities in the database.
   * @throws {@link InternalServerErrorException} If there is an error while fetching the games from the database.
   */
  async findAll() {
    try {
      return await this.prisma.games.findMany();
    } catch (error) {
      console.error('Error finding all games:', error);
      throw new InternalServerErrorException('Failed to fetch games.');
    }
  }

  /**
   * @summary Retrieves a single game entity from the database based on the provided ID.
   * @param id - The unique identifier of the game to be retrieved.
   * @returns The game entity with the specified ID.
   * @throws {@link NotFoundException} If a game with the specified ID is not found in the database.
   * @throws {@link InternalServerErrorException} If there is an error while fetching the game from the database.
   */
  async findOne(id: number) {
    try {
      return await this.prisma.games.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Game with ID ${id} not found`);
      }
      console.error('Error finding game:', error);
      throw new InternalServerErrorException(
        `Failed to find game with ID ${id}.`,
      );
    }
  }

  /**
   * @summary Updates an existing game entity in the database based on the provided ID and data transfer object.
   * @param id - The unique identifier of the game to be updated.
   * @param {@link UpdateGameDto} updateGameDto - The data transfer object containing the information needed to update the game.
   * @returns The updated game entity.
   * @throws {@link ConflictException} If a game with the same data already exists in the database.
   * @throws {@link NotFoundException} If a game with the specified ID is not found in the database.
   * @throws {@link InternalServerErrorException} If there is an error while updating the game in the database.
   */
  async update(id: number, updateGameDto: UpdateGameDto) {
    try {
      return await this.prisma.games.update({
        where: { id },
        data: updateGameDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Game with this data already exists');
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Game with ID ${id} not found`);
      }
      console.error('Error updating game:', error);
      throw new InternalServerErrorException(
        `Failed to update game with ID ${id}.`,
      );
    }
  }

  /**
   * @summary Removes a game entity from the database based on the provided ID.
   * @param id - The unique identifier of the game to be removed.
   * @returns The removed game entity.
   * @throws {@link NotFoundException} If a game with the specified ID is not found in the database.
   * @throws {@link InternalServerErrorException} If there is an error while removing the game from the database.
   */
  async remove(id: number) {
    try {
      return await this.prisma.games.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Game with ID ${id} not found`);
      }
      console.error('Error removing game:', error);
      throw new InternalServerErrorException(
        `Failed to remove game with ID ${id}.`,
      );
    }
  }
}
