import { Injectable } from '@nestjs/common';
import { Note } from '../note';
import { Notes } from '../notes';

@Injectable()
export class NotesService {
  private readonly notes: Notes = {
    1: {
      id: this.uuidv4(),
      title: 'Note number one',
      note: 'Test note',
      user_id: 'user1',
    },
    2: {
      id: this.uuidv4(),
      title: 'Note number two',
      note: 'Test note',
      user_id: 'user2',
    },
    3: {
      id: this.uuidv4(),
      title: 'Note number three',
      note: 'Test note',
      user_id: 'user3',
    },
    4: {
      id: this.uuidv4(),
      title: 'Note number four',
      note: 'Test note',
      user_id: 'user1',
    },
  };

  findAll(): Notes {
    return this.notes;
  }

  create(newNote: Note) {
    const id = this.uuidv4();
    this.notes[Object.keys(this.notes).length + 1] = {
      ...newNote,
      id,
    };
  }

  find(id: number): Note | null {
    return this.notes[id] || null;
  }

  update(note: Note, id: number): Note | Error {
    return this.notes[id]
      ? (this.notes[id] = note)
      : new Error('Error updating');
  }

  delete(id: number): Boolean | null {
    return this.notes[id] ? delete this.notes[id] : null;
  }

  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
