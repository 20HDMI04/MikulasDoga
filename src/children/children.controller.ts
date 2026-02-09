import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
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
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { ChildEntity } from './entities/child.entity';

@ApiTags('children')
@Controller('children')
@ApiInternalServerErrorResponse({
  description: 'A server-side error occurred.',
})
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new child' })
  @ApiResponse({
    status: 201,
    description: 'The child was successfully created.',
    type: ChildEntity,
  })
  @ApiConflictResponse({
    description: 'A child with the given data already exists.',
  })
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all children',
    description: 'Returns all children along with their associated toys.',
  })
  @ApiResponse({ status: 200, type: ChildEntity, isArray: true })
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a child by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the child',
    example: 1,
  })
  @ApiResponse({ status: 200, type: ChildEntity })
  @ApiNotFoundResponse({ description: 'No child found with the given ID.' })
  findOne(@Param('id') id: string) {
    return this.childrenService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a child's information" })
  @ApiResponse({ status: 200, type: ChildEntity })
  @ApiNotFoundResponse({
    description: 'The child to be updated was not found.',
  })
  @ApiConflictResponse({
    description: 'The new data conflicts with an existing record.',
  })
  update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childrenService.update(+id, updateChildDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a child' })
  @ApiResponse({
    status: 200,
    description: 'Successful deletion.',
    type: ChildEntity,
  })
  @ApiNotFoundResponse({
    description: 'The child to be deleted was not found.',
  })
  remove(@Param('id') id: string) {
    return this.childrenService.remove(+id);
  }

  @Put(':childId/toys/:gameId')
  @ApiOperation({ summary: 'Assign a toy to a child' })
  @ApiParam({ name: 'childId', example: 1 })
  @ApiParam({ name: 'gameId', example: 5 })
  @ApiResponse({
    status: 200,
    description: 'The toy was successfully assigned.',
    type: ChildEntity,
  })
  @ApiNotFoundResponse({
    description: 'There is no child or game found with the given IDs.',
  })
  addGameToChild(
    @Param('childId') childId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.childrenService.addGameToChild(+childId, +gameId);
  }

  @Delete(':childId/toys/:gameId')
  @ApiOperation({ summary: 'Remove a toy from a child' })
  @ApiResponse({
    status: 200,
    description: 'The toy was successfully removed from the child.',
    type: ChildEntity,
  })
  @ApiNotFoundResponse({
    description: 'There is no child or game found with the given IDs.',
  })
  removeGameFromChild(
    @Param('childId') childId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.childrenService.removeGameFromChild(+childId, +gameId);
  }
}
