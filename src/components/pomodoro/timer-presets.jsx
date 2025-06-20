"use client"

import { Button } from "@/components/ui/button"

export function TimerPresets({ selectedPreset, onPresetSelect }) {
  const presets = [
    {
      id: "classic",
      name: "Classic Pomodoro",
      focus: 1500, // 25 min
      break: 300, // 5 min
      description: "25 min focus • 5 min break",
      subtitle: "The original technique by Francesco Cirillo",
      color: "bg-primary",
    },
    {
      id: "extended",
      name: "Extended Focus",
      focus: 3000, // 50 min
      break: 600, // 10 min
      description: "50 min focus • 10 min break",
      subtitle: "For deep work and complex tasks",
      color: "bg-blue-500",
    },
    {
      id: "quick",
      name: "Quick Sprint",
      focus: 900, // 15 min
      break: 300, // 5 min
      description: "15 min focus • 5 min break",
      subtitle: "Perfect for beginners or quick tasks",
      color: "bg-green-500",
    },
    {
      id: "ultradian",
      name: "Ultradian Rhythm",
      focus: 5400, // 90 min
      break: 1200, // 20 min
      description: "90 min focus • 20 min break",
      subtitle: "Based on natural energy cycles",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-medium text-foreground">Timer Presets</h4>
        <p className="text-sm text-muted-foreground">Quick setup with popular Pomodoro configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {presets.map((preset) => (
          <Button
            key={preset.id}
            variant={selectedPreset === preset.id ? "default" : "outline"}
            className={`h-auto p-4 flex flex-col items-start gap-2 transition-all duration-300 relative ${
              selectedPreset === preset.id
                ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                : "hover:bg-primary/5 hover:border-primary/50"
            }`}
            onClick={() => onPresetSelect(preset)}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  selectedPreset === preset.id ? "bg-primary-foreground" : preset.color.replace("bg-", "bg-")
                }`}
              ></div>
              <span className="font-semibold">{preset.name}</span>
            </div>
            <div
              className={`text-sm text-left ${
                selectedPreset === preset.id ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}
            >
              {preset.description}
            </div>
            <div
              className={`text-xs text-left ${
                selectedPreset === preset.id ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}
            >
              {preset.subtitle}
            </div>
            {selectedPreset === preset.id && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
              </div>
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}
