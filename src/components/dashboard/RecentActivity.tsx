import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface Activity {
  id: string
  campaign: string
  date: string
  time: string
  messages: number
  status: "success" | "error" | "partial"
}

const mockActivities: Activity[] = [
  {
    id: "1",
    campaign: "Promo Imóveis Agosto",
    date: "Hoje",
    time: "14:30",
    messages: 180,
    status: "success"
  },
  {
    id: "2", 
    campaign: "Follow-up Clientes",
    date: "Ontem",
    time: "09:15",
    messages: 95,
    status: "success"
  },
  {
    id: "3",
    campaign: "Novos Lançamentos",
    date: "01/08",
    time: "16:45",
    messages: 150,
    status: "partial"
  },
  {
    id: "4",
    campaign: "Pesquisa Satisfação",
    date: "31/07",
    time: "11:20",
    messages: 75,
    status: "error"
  }
]

export function RecentActivity() {
  const getStatusConfig = (status: Activity["status"]) => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle,
          label: "Sucesso",
          variant: "default" as const,
          className: "bg-success text-success-foreground"
        }
      case "error":
        return {
          icon: XCircle,
          label: "Falhou",
          variant: "destructive" as const,
          className: "bg-danger text-danger-foreground"
        }
      case "partial":
        return {
          icon: AlertCircle,
          label: "Parcial",
          variant: "secondary" as const,
          className: "bg-warning text-warning-foreground"
        }
    }
  }

  return (
    <Card className="bg-gradient-card border-0 shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
          <Button variant="link" className="text-primary p-0 h-auto">
            Ver todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const statusConfig = getStatusConfig(activity.status)
            const StatusIcon = statusConfig.icon
            
            return (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <StatusIcon className={`h-5 w-5 ${
                      activity.status === 'success' ? 'text-success' :
                      activity.status === 'error' ? 'text-danger' : 'text-warning'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.campaign}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.date} às {activity.time} • {activity.messages} mensagens
                    </p>
                  </div>
                </div>
                <Badge className={`${statusConfig.className} text-xs`}>
                  {statusConfig.label}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}