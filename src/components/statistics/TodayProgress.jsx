"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Calendar, Timer, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, CartesianGrid } from "recharts";

export function TodayProgress({ stats, hourlyData }) {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Transform data for Recharts
  const chartData = hourlyData.map((item) => ({
    hour: `${item.hour}:00`,
    sessions: item.sessions,
  }));

  const chartConfig = {
    sessions: {
      label: "Sessions",
      color: "#ef4444", // Direct red color
    },
  };

  // Calculate today's sessions from hourly data
  const todaySessions = hourlyData[hourlyData.length - 1]?.sessions || 0;
  const dailyGoal = 6;
  const progressPercentage = Math.round((todaySessions / dailyGoal) * 100);

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
            <p className="text-2xl font-bold text-foreground">
              {formatTime(stats.todayFocusTime)}
            </p>
            <p className="text-sm text-muted-foreground">Focus Time</p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-xl">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {todaySessions}
            </p>
            <p className="text-sm text-muted-foreground">Sessions</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Daily Goal Progress</span>
            <span className="font-medium">
              {todaySessions}/{dailyGoal} sessions
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary to-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>

          {/* Progress Graph */}
          <div className="mt-6 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-foreground">
                Sessions Throughout the Day
              </h4>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-red-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Progress</span>
              </div>
            </div>

            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="hour"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, -3)} // Remove ":00" from time
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="sessions"
                  type="linear"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
