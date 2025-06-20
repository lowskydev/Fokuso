import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export function WeeklyOverview({ weeklyData }) {
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
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-500" />
          </div>
          This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weeklyData.map((day, index) => (
            <div key={day.day} className="flex items-center gap-4">
              <div className="w-12 text-sm font-medium text-muted-foreground">{day.day}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(day.sessions / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-16">{day.sessions} sessions</span>
                </div>
                <p className="text-xs text-muted-foreground">{formatTime(day.focusTime)} focused</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
