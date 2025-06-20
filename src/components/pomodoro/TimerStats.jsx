import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Target, Zap } from "lucide-react"

export function TimerStats({ completedSessions, isBreak, isRunning }) {
  const getSessionType = () => (isBreak ? "Break Time" : "Focus Session")

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sessions Completed</p>
              <p className="text-2xl font-bold text-foreground">{completedSessions}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Session</p>
              <p className="text-2xl font-bold text-foreground">{getSessionType()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${isRunning ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                ></div>
                <p className="text-2xl font-bold text-foreground">{isRunning ? "Active" : "Paused"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
