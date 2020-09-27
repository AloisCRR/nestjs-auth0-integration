import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from '../note';
import { Notes } from '../notes';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../permissions.decorator';
import { PermissionsGuard } from '../permissions.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(): Promise<Notes> {
    return this.notesService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Note> {
    return this.notesService.find(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @Permissions('create:notes')
  create(@Body('note') note: Note) {
    this.notesService.create(note);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Put(':id')
  @Permissions('update:notes')
  update(@Body('note') note: Note, @Param('id') id: number) {
    this.notesService.update(note, id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  @Permissions('delete:notes')
  delete(@Param('id') id: number) {
    this.notesService.delete(id);
  }
}
