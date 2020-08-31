import { IsString, IsOptional } from 'class-validator';
export class Note {
  @IsString() @IsOptional() readonly id: string;
  @IsString() readonly title: string;
  @IsString() readonly note: string;
  @IsString() readonly user_id: string;
}
