import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

export function StatsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Your Progress
        </h1>
        <p className="text-muted-foreground text-lg mt-2">Track your focus journey and celebrate achievements</p>
      </div>
      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-lg">
        <TrendingUp className="w-5 h-5 mr-2" />
        All Time Stats
      </Badge>
    </div>
  )
}
