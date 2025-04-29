"use client";

import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { saveNote } from "../utils/storage";
import { Loader2 } from "lucide-react";
import type { AppView } from "../App";

interface AddNoteProps {
  navigate: (view: AppView) => void;
}

export default function AddNote({ navigate }: AddNoteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Why I chose useState + this submit handler - provides controlled inputs for validation and feedback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      // Why show spinner here - provides visual feedback during the save operation
      saveNote({ title, content });

      toast({
        title: "Note saved",
        description: "Your note has been saved successfully",
      });

      // Navigate to the notes list after saving
      navigate({ type: "list" });
    } catch {
      // Why display error banner - informs user of the failure and suggests retry
      toast({
        title: "Failed to save note",
        description: "There was an error saving your note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Note</CardTitle>
        <CardDescription>
          Create a new note with a title and content
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Write your note here..."
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSaving}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate({ type: "list" })}
            disabled={isSaving}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Note
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
