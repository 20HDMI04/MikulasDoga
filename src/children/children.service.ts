import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private readonly prisma: PrismaService) {}

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
