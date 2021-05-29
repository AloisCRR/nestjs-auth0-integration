import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useNotes } from '../context/NotesContext';
import Modal from './NoteModal';
import { FaPlus } from 'react-icons/fa';

const CreateButton: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const { newNote } = useNotes();

  return (
    <>
      {isAuthenticated && (
        <>
          <button
            className="button navbar-action-text"
            onClick={(): void => setIsOpen(true)}
          >
            Create new note
          </button>
          <FaPlus
            className="navbar-action-icon circular-button"
            onClick={(): void => setIsOpen(true)}
          ></FaPlus>
        </>
      )}

      {isOpen && (
        <Modal
          closeModal={(): void => setIsOpen(false)}
          action="create"
          create={newNote}
        ></Modal>
      )}
    </>
  );
};

export default CreateButton;
