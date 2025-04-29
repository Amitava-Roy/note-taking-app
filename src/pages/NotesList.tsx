"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Pencil, AlertCircle, Trash2 } from "lucide-react"
import { getNotes, deleteNote } from "../utils/storage"
import type { Note } from "../types"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { AppView } from "../App"

interface NotesListProps {
  navigate: (view: AppView) => void
}

export default function NotesList({ navigate }: NotesListProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Why useEffect to sync storage → state - ensures notes are loaded when component mounts and stays in sync
  useEffect(() => {
    const loadNotes = () => {
      try {
        setLoading(true)
        const storedNotes = getNotes()
        setNotes(storedNotes)
        setError(null)
      } catch (err) {
        setError("Failed to load notes. Please refresh the page.")
      } finally {
        setLoading(false)
      }
    }

    loadNotes()
  }, [])

  const handleDeleteNote = (id: string) => {
    try {
      deleteNote(id)
      setNotes(notes.filter((note) => note.id !== id))
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully",
      })
    } catch (err) {
      toast({
        title: "Failed to delete note",
        description: "There was an error deleting your note. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get a snippet of the content
  const getContentSnippet = (content: string, maxLength = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Notes</h2>
        <Button className="flex items-center gap-2" onClick={() => navigate({ type: "add" })}>
          <Pencil className="h-4 w-4" />
          Add New Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <Card className="text-center p-6">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">You don't have any notes yet. Create your first note!</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate({ type: "add" })}>Create Note</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Card key={note.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{note.title}</CardTitle>
                <CardDescription>{formatDate(note.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-muted-foreground">{getContentSnippet(note.content)}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => navigate({ type: "view", noteId: note.id })}>
                  View Note
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your note.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteNote(note.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
