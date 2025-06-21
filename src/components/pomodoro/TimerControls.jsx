"use client";

import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export function TimerControls({
  isRunning,
  isBreak,
  handleStartPause,
  handleReset,
  children, // For the settings dialog
}) {
  return (
    <div className="space-y-6">
      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleStartPause}
          size="lg"
          className={`px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
            isBreak
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-6 h-6 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-6 h-6 mr-2" />
              Start
            </>
          )}
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="px-6 py-3 text-lg font-semibold border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
        >
          <RotateCcw className="w-6 h-6 mr-2" />
          Reset
        </Button>

        {children}
      </div>

      {/* Keyboard Shortcuts */}
      <div className="text-sm text-muted-foreground space-y-1 text-center">
        <p>
          <kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd>{" "}
          Start/Pause
        </p>
        <p>
          <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+R</kbd> Reset
        </p>
      </div>
    </div>
  );
}
