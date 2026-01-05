import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}
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

  async findAll() {
    try {
      return await this.prisma.games.findMany();
    } catch (error) {
      console.error('Error finding all games:', error);
      throw new InternalServerErrorException('Failed to fetch games.');
    }
  }

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
