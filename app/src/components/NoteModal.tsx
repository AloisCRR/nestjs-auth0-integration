import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { NotesContextDefault } from '../context/NotesContext';
import { NoteModel } from './Notes';

type CreateAction = {
  action: 'create';
  create: NotesContextDefault['newNote'];
  update?: never;
  noteData?: never;
};

type UpdateAction = {
  action: 'update';
  update: NotesContextDefault['updateNote'];
  create?: never;
  noteData: NoteModel;
};

type ModalProps = { closeModal: () => void } & (CreateAction | UpdateAction);

const Modal: React.FC<ModalProps> = ({
  action,
  noteData,
  create,
  update,
  closeModal,
}) => {
  const portalElement = document.getElementById('portal');
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);

  async function formHandler(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    const title = titleInput.current;
    const content = contentInput.current;

    if (title && content) {
      const body = {
        title: title.value,
        note: content.value,
      };

      action == 'create'
        ? await create?.(body)
        : await update?.(noteData?.id as string, body);

      closeModal();
    }
  }

  return portalElement
    ? ReactDOM.createPortal(
        <>
          <div className="overlay"></div>
          <div className="modal">
            <div className="modal-title">
              {action == 'create'
                ? 'Create a new note'
                : 'Update existing note'}
            </div>
            <form onSubmit={formHandler} className="modal-content">
              <label htmlFor="title">Title</label>
              <input
                defaultValue={noteData?.title}
                ref={titleInput}
                type="text"
                id="title"
                autoFocus
                required
                autoComplete="off"
              />
              <label htmlFor="content">Content</label>
              <textarea
                defaultValue={noteData?.note}
                ref={contentInput}
                rows={10}
                cols={50}
                id="content"
                required
                autoComplete="off"
              />
              <div className="modal-actions">
                <button
                  type="button"
                  className="no-emphasis-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="button-no-spacing">
                  {action == 'create' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </>,
        portalElement,
      )
    : null;
};

export default Modal;
