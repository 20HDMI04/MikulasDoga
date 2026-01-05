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
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childrenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childrenService.update(+id, updateChildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childrenService.remove(+id);
  }

  @Put(':childId/toys/:gameId')
  addGameToChild(
    @Param('childId') childId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.childrenService.addGameToChild(+childId, +gameId);
  }

  @Delete(':childId/toys/:gameId')
  removeGameFromChild(
    @Param('childId') childId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.childrenService.removeGameFromChild(+childId, +gameId);
  }
}
