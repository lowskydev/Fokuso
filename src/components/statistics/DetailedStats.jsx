import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Coffee, Brain } from "lucide-react";

export function DetailedStats({ stats }) {
  const formatHours = (minutes) => {
    if (!minutes || minutes === 0) return "0";
    return (minutes / 60).toFixed(1);
  };

  const formatMinutes = (minutes) => {
    if (!minutes || minutes === 0) return "0";
    return Math.round(minutes);
  };

  // Calculate derived statistics from the stats data
  const focusBreakRatio =
    stats.totalBreakTime > 0
      ? Math.round(stats.totalFocusTime / stats.totalBreakTime)
      : stats.totalFocusTime > 0
      ? "∞"
      : 0;

  const averageBreakLength =
    stats.totalSessions > 0 && stats.totalBreakTime > 0
      ? Math.round(stats.totalBreakTime / stats.totalSessions)
      : 0;

  const accuracy =
    stats.flashcardsReviewedToday > 0
      ? Math.round((stats.correctAnswers / stats.flashcardsReviewedToday) * 100)
      : stats.averageAccuracy || 100;

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
            <span className="font-semibold">
              {formatMinutes(stats.averageSessionLength)} min
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Longest Streak</span>
            <span className="font-semibold">
              {stats.longestStreak || 0} days
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">This Week</span>
            <span className="font-semibold">
              {stats.thisWeekSessions || 0} sessions
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">This Month</span>
            <span className="font-semibold">
              {stats.thisMonthSessions || 0} sessions
            </span>
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
            <p className="text-3xl font-bold text-foreground">
              {formatHours(stats.totalBreakTime)}h
            </p>
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
            <Brain className="w-5 h-5 text-purple-500" />
            Flashcards Today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">
              {stats.flashcardsReviewedToday || 0}
            </p>
            <p className="text-sm text-muted-foreground">Cards Reviewed</p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Correct Answers</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {stats.correctAnswers || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Incorrect Answers</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                {stats.incorrectAnswers || 0}
              </span>
            </div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <p className="text-sm font-medium text-purple-700 dark:text-purple-400">
              {`Your accuracy is ${stats.averageAccuracy}%`}
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-500">
              {accuracy >= 80
                ? "Excellent retention!"
                : accuracy >= 60
                ? "Good progress!"
                : "Keep practicing!"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
