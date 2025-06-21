import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy } from "lucide-react";

export function Achievements({ achievements }) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                achievement.earned
                  ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800"
                  : "bg-muted/50 border-border opacity-60"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    achievement.earned ? "bg-yellow-500" : "bg-muted"
                  }`}
                >
                  <Trophy
                    className={`w-5 h-5 ${
                      achievement.earned
                        ? "text-white"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-semibold ${
                      achievement.earned
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {achievement.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      achievement.earned
                        ? "text-muted-foreground"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {achievement.description}
                  </p>
                  {achievement.earned && (
                    <Badge
                      variant="secondary"
                      className="mt-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    >
                      Earned
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
