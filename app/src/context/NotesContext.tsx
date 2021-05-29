import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect, useMemo } from 'react';
import { NoteModel } from '../components/Notes';

export type NoteRequestBody = {
  title: string;
  note: string;
};

export type NotesContextDefault = {
  notes: NoteModel[];
  allNotes: () => Promise<void>;
  myNotes: () => void;
  newNote: (note: NoteRequestBody) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, note: NoteRequestBody) => Promise<void>;
};

export const NotesContext = React.createContext<NotesContextDefault>({
  notes: [],
  allNotes: async () => undefined,
  myNotes: () => undefined,
  newNote: async () => undefined,
  deleteNote: async () => undefined,
  updateNote: async () => undefined,
});

export const NotesProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [resetNotes, setResetNotes] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function loadNotes(): Promise<void> {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch('http://localhost:4000/notes', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const notesResponse = (await response.json()) as NoteModel[];

        setNotes(notesResponse);
      } catch (e) {
        console.error(e);
      }
    }

    loadNotes();
  }, [resetNotes]);

  async function newNote(body: NoteRequestBody): Promise<void> {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch('http://localhost:4000/notes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const newNote = (await response.json()) as NoteModel;

      setNotes([...notes, newNote]);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateNote(id: string, body: NoteRequestBody): Promise<void> {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(`http://localhost:4000/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const newNote = (await response.json()) as NoteModel;

      const index = notes.findIndex((note) => note.id == id);
      const newNotes = [...notes];
      newNotes[index] = newNote;

      setNotes(newNotes);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteNote(id: string): Promise<void> {
    const accessToken = await getAccessTokenSilently();

    try {
      await fetch(`http://localhost:4000/notes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const newNotes = notes.filter((note) => note.id != id);

      setNotes(newNotes);
    } catch (error) {
      console.error(error);
    }
  }

  async function allNotes(): Promise<void> {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(`http://localhost:4000/notes/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const newNotes = (await response.json()) as NoteModel[];

      setNotes(newNotes);
    } catch (error) {
      console.error(error);
    }
  }

  function myNotes(): void {
    setResetNotes(!resetNotes);
  }

  const value = useMemo<NotesContextDefault>(
    () => ({ notes, allNotes, myNotes, newNote, deleteNote, updateNote }),
    [notes],
  );

  return (
    <NotesContext.Provider value={value}> {children} </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextDefault => {
  const context = React.useContext(NotesContext);

  if (!context)
    throw new Error('useNotes should have inside a provider NotesContext');

  return context;
};
