import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note';

@Injectable()
export class NotesService {
  private readonly notes: Note[] = [];

  create(user_id: string, newNote: CreateNoteDto): Note {
    const note: Note = { ...newNote, id: this.uuidv4(), user_id };

    this.notes.push(note);

    return note;
  }

  find(user_id: string, id: string): Note {
    return this.notes.find((note) => note.id == id && note.user_id == user_id);
  }

  findAll(user_id?: string): Note[] {
    return user_id
      ? this.notes.filter((note) => note.user_id == user_id)
      : this.notes;
  }

  update(note: UpdateNoteDto, user_id: string, id: string): Note {
    const noteIndex = this.notes.findIndex(
      (note) => note.id == id && note.user_id == user_id,
    );

    if (noteIndex == -1) throw new NotFoundException();

    this.notes[noteIndex] = { ...note, id, user_id };

    return this.notes[noteIndex];
  }

  delete(user_id: string, id: string): Note {
    const noteIndex = this.notes.findIndex(
      (note) => note.id == id && note.user_id == user_id,
    );

    if (noteIndex >= 0) {
      this.notes.splice(noteIndex, 1);
      return;
    }

    throw new NotFoundException();
  }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
}
