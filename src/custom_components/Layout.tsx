import type React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { Pencil, List } from "lucide-react";
import type { AppView } from "../App";

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  navigate: (view: AppView) => void;
}

export default function Layout({
  children,
  currentView,
  navigate,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">NoteTaker</h1>
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation - simple tabs for switching between views */}
        <div className="flex mb-6 border-b">
          {/* // Why this nav approach for simplicity - tabs provide clear visual indication of current section */}
          <Button
            variant={currentView.type === "list" ? "default" : "ghost"}
            className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[active]:border-primary"
            data-active={currentView.type === "list"}
            onClick={() => navigate({ type: "list" })}
          >
            <List className="h-4 w-4" />
            View Notes
          </Button>
          <Button
            variant={currentView.type === "add" ? "default" : "ghost"}
            className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[active]:border-primary"
            data-active={currentView.type === "add"}
            onClick={() => navigate({ type: "add" })}
          >
            <Pencil className="h-4 w-4" />
            Add Note
          </Button>
        </div>

        <main>{children}</main>
      </div>
    </div>
  );
}
