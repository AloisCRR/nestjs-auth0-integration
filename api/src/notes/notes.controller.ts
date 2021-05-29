import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from 'src/auth/jwt.strategy';
import { User } from 'src/common/decorators/get-user.decorator';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Permissions('read:notes')
  adminFindAll(): Note[] {
    return this.notesService.findAll();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@User() user: UserPayload): Note[] {
    return this.notesService.findAll(user.sub);
  }

  @Get(':id')
  find(@Param('id') id: string, @User() user: UserPayload): Note {
    return this.notesService.find(user.sub, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() note: CreateNoteDto, @User() user: UserPayload): Note {
    return this.notesService.create(user.sub, note);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Body() note: UpdateNoteDto,
    @Param('id') id: string,
    @User() user: UserPayload,
  ): Note {
    return this.notesService.update(note, user.sub, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string, @User() user: UserPayload): void {
    this.notesService.delete(user.sub, id);
  }
}
