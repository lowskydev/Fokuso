"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { playNotificationSound } from "@/utils/sound"
import { TimerStats } from "@/components/pomodoro/timer-stats"
import { TimerDisplay } from "@/components/pomodoro/timer-display"
import { TimerControls } from "@/components/pomodoro/timer-controls"
import { SettingsDialog } from "@/components/pomodoro/settings-dialog"

function PomodoroPage() {
  const defaultStudy = 1500 // 25 min
  const defaultBreak = 300 // 5 min

  const [studyDuration, setStudyDuration] = useState(
    Number.parseInt(localStorage.getItem("studyDuration") || defaultStudy, 10),
  )
  const [breakDuration, setBreakDuration] = useState(
    Number.parseInt(localStorage.getItem("breakDuration") || defaultBreak, 10),
  )

  const [timeLeft, setTimeLeft] = useState(studyDuration)
  const [breakTimeLeft, setBreakTimeLeft] = useState(breakDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(
    Number.parseInt(localStorage.getItem("completedSessions") || "0", 10),
  )
  const [soundEnabled, setSoundEnabled] = useState(localStorage.getItem("soundEnabled") !== "false")
  const [soundType, setSoundType] = useState(localStorage.getItem("soundType") || "bell")
  const [selectedPreset, setSelectedPreset] = useState(null)

  // Play notification sound
  const playNotification = useCallback(() => {
    if (soundEnabled) {
      playNotificationSound(soundType)
    }
  }, [soundEnabled, soundType])

  const handleStartPause = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const handleReset = useCallback(() => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(studyDuration)
    setBreakTimeLeft(breakDuration)
  }, [studyDuration, breakDuration])

  useEffect(() => {
    let timer
    if (isRunning) {
      timer = setInterval(() => {
        if (!isBreak && timeLeft > 0) {
          setTimeLeft((prev) => prev - 1)
        } else if (isBreak && breakTimeLeft > 0) {
          setBreakTimeLeft((prev) => prev - 1)
        } else {
          if (!isBreak) {
            // Study session completed
            setIsBreak(true)
            setBreakTimeLeft(breakDuration)
            setCompletedSessions((prev) => {
              const newCount = prev + 1
              localStorage.setItem("completedSessions", newCount.toString())
              return newCount
            })
            playNotification()
          } else {
            // Break completed
            setIsBreak(false)
            setTimeLeft(studyDuration)
            playNotification()
          }
        }
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning, isBreak, timeLeft, breakTimeLeft, studyDuration, breakDuration, playNotification])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space" && !e.target.matches("input")) {
        e.preventDefault()
        handleStartPause()
      } else if (e.code === "KeyR" && e.ctrlKey) {
        e.preventDefault()
        handleReset()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleStartPause, handleReset])

  const handleDurationChange = (type, value) => {
    const seconds = Math.max(1, Math.floor(Number(value) * 60))
    if (type === "study") {
      setStudyDuration(seconds)
      localStorage.setItem("studyDuration", seconds)
      if (!isBreak) setTimeLeft(seconds)
    } else {
      setBreakDuration(seconds)
      localStorage.setItem("breakDuration", seconds)
      if (isBreak) setBreakTimeLeft(seconds)
    }
    // Clear preset selection when manually changing durations
    setSelectedPreset(null)
  }

  const toggleSound = () => {
    const newSoundEnabled = !soundEnabled
    setSoundEnabled(newSoundEnabled)
    localStorage.setItem("soundEnabled", newSoundEnabled.toString())
  }

  const handleSoundTypeChange = (newSoundType) => {
    setSoundType(newSoundType)
    localStorage.setItem("soundType", newSoundType)
  }

  const testSound = () => {
    playNotificationSound(soundType)
  }

  const handlePresetSelect = (preset) => {
    setStudyDuration(preset.focus)
    setBreakDuration(preset.break)
    localStorage.setItem("studyDuration", preset.focus.toString())
    localStorage.setItem("breakDuration", preset.break.toString())
    if (!isBreak) setTimeLeft(preset.focus)
    else setBreakTimeLeft(preset.break)
    setSelectedPreset(preset.id)
  }

  const currentTime = isBreak ? breakTimeLeft : timeLeft
  const totalTime = isBreak ? breakDuration : studyDuration
  const progress = totalTime > 0 ? ((totalTime - currentTime) / totalTime) * 100 : 0

  const getMotivationalText = () => {
    if (isBreak) {
      return "Take a breather, you've earned it!"
    }
    if (currentTime > totalTime * 0.75) {
      return "Let's get started! You've got this."
    } else if (currentTime > totalTime * 0.25) {
      return "You're in the zone! Keep going."
    } else {
      return "Almost there! Stay focused."
    }
  }

  return (
    <div className="space-y-6">
      <TimerStats completedSessions={completedSessions} isBreak={isBreak} isRunning={isRunning} />

      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-2xl">
        <CardContent className="p-8">
          <TimerDisplay
            currentTime={currentTime}
            isBreak={isBreak}
            progress={progress}
            getMotivationalText={getMotivationalText}
          />

          <TimerControls
            isRunning={isRunning}
            isBreak={isBreak}
            handleStartPause={handleStartPause}
            handleReset={handleReset}
          >
            <SettingsDialog
              soundEnabled={soundEnabled}
              soundType={soundType}
              studyDuration={studyDuration}
              breakDuration={breakDuration}
              completedSessions={completedSessions}
              selectedPreset={selectedPreset}
              toggleSound={toggleSound}
              handleSoundTypeChange={handleSoundTypeChange}
              testSound={testSound}
              handleDurationChange={handleDurationChange}
              onPresetSelect={handlePresetSelect}
              setCompletedSessions={setCompletedSessions}
            />
          </TimerControls>
        </CardContent>
      </Card>
    </div>
  )
}

export default PomodoroPage
