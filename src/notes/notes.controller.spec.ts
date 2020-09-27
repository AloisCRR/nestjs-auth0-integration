import { Test, TestingModule } from '@nestjs/testing';
import { Notes } from 'src/notes';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

describe('NotesController', () => {
  let notesController: NotesController;
  let notesService: NotesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    }).compile();

    notesService = app.get<NotesService>(NotesService);
    notesController = app.get<NotesController>(NotesController);
  });

  describe('findAll', () => {
    it('should return object of notes', async () => {
      const result: Notes = {
        1: {
          id: 'ijdskmsdkffm3-33343njdn',
          title: 'Note number one',
          note: 'Test note',
          user_id: 'user1',
        },
      };

      jest.spyOn(notesService, 'findAll').mockImplementation(() => result);

      expect(await notesController.findAll()).toBe(result);
    });
  });
});
