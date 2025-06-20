import { Badge } from "@/components/ui/badge"
import { Timer, Coffee } from "lucide-react"

export function TimerDisplay({ currentTime, isBreak, progress, getMotivationalText }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const getSessionType = () => (isBreak ? "Break Time" : "Focus Session")

  return (
    <div className="text-center space-y-6">
      {/* Session Type Badge */}
      <Badge
        variant="secondary"
        className={`px-6 py-2 text-lg font-medium ${
          isBreak
            ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
            : "bg-primary/10 text-primary border-primary/20"
        }`}
      >
        {isBreak ? <Coffee className="w-5 h-5 mr-2" /> : <Timer className="w-5 h-5 mr-2" />}
        {getSessionType()}
      </Badge>

      {/* Main Timer Display */}
      <div className="space-y-4">
        <div
          className={`text-6xl md:text-7xl font-mono font-bold transition-all duration-500 ${
            isBreak ? "text-blue-600 dark:text-blue-400" : "text-primary"
          }`}
        >
          {formatTime(currentTime)}
        </div>

        {/* Progress Ring */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className={`transition-all duration-1000 ${isBreak ? "text-blue-500" : "text-primary"}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{Math.round(progress)}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Text */}
      <p className="text-lg text-muted-foreground font-medium">{getMotivationalText()}</p>
    </div>
  )
}
