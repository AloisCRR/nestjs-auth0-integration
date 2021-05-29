import { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import Modal from './NoteModal';
import { NoteModel } from './Notes';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

type NoteProps = {
  data: NoteModel;
};

const Note: React.FC<NoteProps> = ({ data }) => {
  const { updateNote, deleteNote } = useNotes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="note">
      <div>
        <h3> {data.title} </h3>
        <hr className="separator" />
        <p className="mb">{data.note}</p>
      </div>
      <div className="note-actions">
        <button
          title="Delete note"
          className="circular-button"
          onClick={(): Promise<void> => deleteNote(data.id)}
        >
          <FaTrash></FaTrash>
        </button>

        <button
          className="circular-button"
          onClick={(): void => setIsOpen(true)}
        >
          <FaPencilAlt></FaPencilAlt>
        </button>

        {isOpen && (
          <Modal
            closeModal={(): void => setIsOpen(false)}
            action="update"
            update={updateNote}
            noteData={data}
          ></Modal>
        )}
      </div>
    </div>
  );
};

export default Note;
