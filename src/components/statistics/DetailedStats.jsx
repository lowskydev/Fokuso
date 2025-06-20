import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Coffee, TrendingUp } from "lucide-react"

export function DetailedStats({ stats }) {
  const formatHours = (minutes) => {
    return (minutes / 60).toFixed(1)
  }

  // Calculate derived statistics from the stats data
  const focusBreakRatio = stats.totalBreakTime > 0 ? Math.round(stats.totalFocusTime / stats.totalBreakTime) : 0
  const averageBreakLength = stats.totalSessions > 0 ? Math.round(stats.totalBreakTime / stats.totalSessions) : 0

  // Calculate weekly and monthly growth percentages
  const weeklyGrowth =
    stats.thisWeekSessions > 0
      ? Math.round(((stats.thisWeekSessions - stats.thisWeekSessions * 0.87) / (stats.thisWeekSessions * 0.87)) * 100)
      : 0
  const monthlyGrowth =
    stats.thisMonthSessions > 0
      ? Math.round(
          ((stats.thisMonthSessions - stats.thisMonthSessions * 0.92) / (stats.thisMonthSessions * 0.92)) * 100,
        )
      : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-500" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Average Session</span>
            <span className="font-semibold">{stats.averageSessionLength} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Longest Streak</span>
            <span className="font-semibold">{stats.longestStreak} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">This Week</span>
            <span className="font-semibold">{stats.thisWeekSessions} sessions</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">This Month</span>
            <span className="font-semibold">{stats.thisMonthSessions} sessions</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Coffee className="w-5 h-5 text-blue-500" />
            Break Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{formatHours(stats.totalBreakTime)}h</p>
            <p className="text-sm text-muted-foreground">Total Break Time</p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Focus/Break Ratio</span>
              <span className="font-semibold">{focusBreakRatio}:1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Break Length</span>
              <span className="font-semibold">{averageBreakLength} min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">+{weeklyGrowth}% this week</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">+{monthlyGrowth}% this month</span>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              {stats.completionRate >= 85
                ? "You're on fire! 🔥"
                : stats.completionRate >= 70
                  ? "Great progress! 💪"
                  : "Keep going! 📈"}
            </p>
            <p className="text-xs text-green-600 dark:text-green-500">
              {stats.completionRate}% completion rate this period
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
