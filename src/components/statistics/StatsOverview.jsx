import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Clock, Flame, Brain } from "lucide-react";

export function StatsOverview({ stats }) {
  const formatHours = (minutes) => {
    return (minutes / 60).toFixed(1);
  };

  const overviewCards = [
    {
      title: "Total Sessions",
      value: stats.totalSessions,
      icon: Trophy,
      gradient: "from-primary to-red-500",
    },
    {
      title: "Total Focus Time",
      value: `${formatHours(stats.totalFocusTime)}h`,
      icon: Clock,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: Flame,
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Flashcards Reviewed Today",
      value: `${stats.flashcardsReviewedToday}`,
      icon: Brain,
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewCards.map((card, index) => (
        <Card
          key={index}
          className="bg-card/80 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 bg-gradient-to-br ${card.gradient} rounded-xl`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {card.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
