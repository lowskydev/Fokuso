"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Volume2, VolumeX, Timer, Coffee } from "lucide-react"
import { TimerPresets } from "./TimerPresets"
import { useState, useEffect } from "react"

export function SettingsDialog({
  soundEnabled,
  soundType,
  studyDuration,
  breakDuration,
  completedSessions,
  selectedPreset,
  toggleSound,
  handleSoundTypeChange,
  testSound,
  handleDurationChange,
  onPresetSelect,
  setCompletedSessions,
}) {
  const [studyMinutes, setStudyMinutes] = useState(Math.floor(studyDuration / 60))
  const [breakMinutes, setBreakMinutes] = useState(Math.floor(breakDuration / 60))

  // Update input values when durations change (from preset selection)
  useEffect(() => {
    setStudyMinutes(Math.floor(studyDuration / 60))
    setBreakMinutes(Math.floor(breakDuration / 60))
  }, [studyDuration, breakDuration])

  const handleStudyChange = (value) => {
    setStudyMinutes(value)
    handleDurationChange("study", value)
  }

  const handleBreakChange = (value) => {
    setBreakMinutes(value)
    handleDurationChange("break", value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="px-6 py-3 text-lg font-semibold border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
        >
          <Settings className="w-6 h-6 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card/95 backdrop-blur-md border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Settings className="w-6 h-6 text-primary" />
            Timer Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-foreground">Sound Notifications</h4>
              <p className="text-sm text-muted-foreground">Play sound when sessions complete</p>
            </div>
            <Button onClick={toggleSound} variant="outline" size="sm" className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {soundEnabled ? "Sound On" : "Sound Off"}
            </Button>
          </div>

          {soundEnabled && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-foreground">Notification Sound</h4>
                  <p className="text-sm text-muted-foreground">Choose your preferred notification sound</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={soundType} onValueChange={handleSoundTypeChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bell">Bell</SelectItem>
                      <SelectItem value="chime">Chime</SelectItem>
                      <SelectItem value="gong">Gong</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={testSound} variant="outline" size="sm">
                    Test
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Separator />

          <TimerPresets selectedPreset={selectedPreset} onPresetSelect={onPresetSelect} />

          <Separator />

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-foreground">Custom Duration</h4>
              <p className="text-sm text-muted-foreground">Set your own focus and break times</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-primary" />
                <Label htmlFor="studyDuration" className="text-lg font-medium">
                  Focus Duration (minutes)
                </Label>
              </div>
              <Input
                id="studyDuration"
                type="number"
                min="1"
                max="120"
                value={studyMinutes}
                onChange={(e) => handleStudyChange(e.target.value)}
                className="text-lg p-4 h-12"
              />
              <p className="text-sm text-muted-foreground">Recommended: 25 minutes for optimal focus</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Coffee className="w-5 h-5 text-blue-600" />
                <Label htmlFor="breakDuration" className="text-lg font-medium">
                  Break Duration (minutes)
                </Label>
              </div>
              <Input
                id="breakDuration"
                type="number"
                min="1"
                max="30"
                value={breakMinutes}
                onChange={(e) => handleBreakChange(e.target.value)}
                className="text-lg p-4 h-12"
              />
              <p className="text-sm text-muted-foreground">Recommended: 5 minutes for short breaks</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-foreground">Reset Statistics</h4>
              <p className="text-sm text-muted-foreground">Clear your completed sessions count</p>
            </div>
            <Button
              onClick={() => {
                setCompletedSessions(0)
                localStorage.setItem("completedSessions", "0")
              }}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/20"
            >
              Reset Stats
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
