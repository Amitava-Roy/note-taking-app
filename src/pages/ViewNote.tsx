"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Trash2 } from "lucide-react"
import { getNoteById, deleteNote } from "../utils/storage"
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

interface ViewNoteProps {
  noteId?: string
  navigate: (view: AppView) => void
}

export default function ViewNote({ noteId, navigate }: ViewNoteProps) {
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!noteId) {
      setError("Note ID is missing")
      setLoading(false)
      return
    }

    try {
      const foundNote = getNoteById(noteId)
      if (foundNote) {
        setNote(foundNote)
      } else {
        setError("Note not found")
      }
    } catch (err) {
      setError("Failed to load note")
    } finally {
      setLoading(false)
    }
  }, [noteId])

  const handleDeleteNote = () => {
    if (!noteId) return

    try {
      deleteNote(noteId)
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully",
      })
      navigate({ type: "list" })
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !note) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Note not found"}</AlertDescription>
        </Alert>
        <Button onClick={() => navigate({ type: "list" })} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Notes
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => navigate({ type: "list" })} variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Notes
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{note.title}</CardTitle>
          <p className="text-sm text-muted-foreground">Created on {formatDate(note.createdAt)}</p>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap">{note.content}</div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Note
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
                <AlertDialogAction onClick={handleDeleteNote}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  )
}
