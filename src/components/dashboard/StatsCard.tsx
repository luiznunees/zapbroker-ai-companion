import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  progress?: number
  maxValue?: number
  trend?: "up" | "down" | "neutral"
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  progress, 
  maxValue,
  trend = "neutral",
  className = "" 
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-success"
      case "down": return "text-danger"
      default: return "text-muted-foreground"
    }
  }

  return (
    <Card className={`bg-gradient-card border-0 shadow-card hover:shadow-hover transition-all duration-300 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-foreground">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </h3>
              {maxValue && (
                <span className="text-sm text-muted-foreground">
                  / {maxValue.toLocaleString()}
                </span>
              )}
            </div>
            {description && (
              <p className={`text-xs mt-1 ${getTrendColor()}`}>
                {description}
              </p>
            )}
            {progress !== undefined && (
              <div className="mt-3">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {progress.toFixed(0)}% utilizado
                </p>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}