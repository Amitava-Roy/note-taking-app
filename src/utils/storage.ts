import type { Note } from "../types";

// Key for storing notes in localStorage
const STORAGE_KEY = "note-taking-app-notes";

export const getNotes = (): Note[] => {
  try {
    const notes = localStorage.getItem(STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    throw new Error("Failed to load notes");
  }
};

/**
 * Get a single note by ID
 */
export const getNoteById = (id: string): Note | undefined => {
  try {
    const notes = getNotes();
    return notes.find((note) => note.id === id);
  } catch (error) {
    console.error("Error getting note by ID:", error);
    throw new Error("Failed to load note");
  }
};

/**
 * Save a new note to localStorage
 */
export const saveNote = (note: Omit<Note, "id" | "createdAt">): Note => {
  try {
    const notes = getNotes();
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([newNote, ...notes]));
    return newNote;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    throw new Error("Failed to save note");
  }
};

/**
 * Delete a note by ID
 */
export const deleteNote = (id: string): void => {
  try {
    const notes = getNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
  } catch (error) {
    console.error("Error deleting from localStorage:", error);
    throw new Error("Failed to delete note");
  }
};

/**
 * Update an existing note
 */
export const updateNote = (updatedNote: Note): Note => {
  try {
    const notes = getNotes();
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    return updatedNote;
  } catch (error) {
    console.error("Error updating in localStorage:", error);
    throw new Error("Failed to update note");
  }
};
