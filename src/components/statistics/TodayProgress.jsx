import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Timer, CheckCircle } from "lucide-react"

export function TodayProgress({ stats }) {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          Today's Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-xl">
            <Timer className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{formatTime(stats.todayFocusTime)}</p>
            <p className="text-sm text-muted-foreground">Focus Time</p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-xl">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground">Sessions</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Daily Goal Progress</span>
            <span className="font-medium">5/6 sessions</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary to-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: "83%" }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
