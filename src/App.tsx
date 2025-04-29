"use client";

import { useState } from "react";
import { ThemeProvider } from "./custom_components/theme-provider";
// import { Toaster } from "@/components/ui/toaster";
import Layout from "./custom_components/Layout";
import AddNote from "./pages/AddNote";
import NotesList from "./pages/NotesList";
import ViewNote from "./pages/ViewNote";
import { Toaster } from "./components/ui/toaster";

// Define the possible views in the application
export type AppView = {
  type: "list" | "add" | "view";
  noteId?: string;
};

function App() {
  // State to track the current view
  const [currentView, setCurrentView] = useState<AppView>({ type: "list" });

  // Function to navigate between views
  const navigate = (view: AppView) => {
    setCurrentView(view);
  };

  // Render the appropriate component based on the current view
  const renderView = () => {
    switch (currentView.type) {
      case "add":
        return <AddNote navigate={navigate} />;
      case "view":
        return <ViewNote noteId={currentView.noteId} navigate={navigate} />;
      case "list":
      default:
        return <NotesList navigate={navigate} />;
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="note-app-theme">
      <Layout currentView={currentView} navigate={navigate}>
        {renderView()}
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
