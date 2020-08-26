import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from '../note';
import { Notes } from '../notes';

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

  @Post()
  create(@Body('note') note: Note) {
    this.notesService.create(note);
  }

  @Put(':id')
  update(@Body('note') note: Note, @Param('id') id: number) {
    this.notesService.update(note, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    this.notesService.delete(id);
  }
}
