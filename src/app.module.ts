import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [NotesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
