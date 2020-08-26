import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [NotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
