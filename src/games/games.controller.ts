import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameEntity } from './entities/game.entity';

@ApiTags('toys')
@Controller('toys')
@ApiInternalServerErrorResponse({
  description: 'A server-side error occurred.',
})
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({
    status: 201,
    description: 'The game was successfully created.',
    type: GameEntity,
  })
  @ApiConflictResponse({
    description: 'A game with the given data already exists.',
  })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval.',
    type: GameEntity,
    isArray: true,
  })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a game by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the game',
    example: 1,
  })
  @ApiResponse({ status: 200, type: GameEntity })
  @ApiNotFoundResponse({ description: 'No game found with the given ID.' })
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update game information' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: GameEntity })
  @ApiNotFoundResponse({ description: 'The game to be updated was not found.' })
  @ApiConflictResponse({
    description: 'The new data conflicts with an existing game.',
  })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete games by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Game successfully deleted.',
    type: GameEntity,
  })
  @ApiNotFoundResponse({ description: 'The game to be deleted was not found.' })
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
