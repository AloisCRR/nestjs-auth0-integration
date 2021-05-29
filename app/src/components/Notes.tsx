import { useNotes } from '../context/NotesContext';
import Note from './Note';

export type NoteModel = {
  id: string;
  title: string;
  note: string;
};

const Notes: React.FC = () => {
  const { notes } = useNotes();

  return (
    <div className="notes">
      {notes?.length
        ? notes.map((note) => <Note key={note.id} data={note}></Note>)
        : null}
    </div>
  );
};

export default Notes;
