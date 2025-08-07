import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Users, Calendar, BarChart3, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const quickActions = [
  {
    title: "Nova Campanha",
    description: "Criar e enviar mensagens",
    icon: Send,
    action: "/disparar",
    variant: "default" as const,
    className: "bg-gradient-primary text-primary-foreground hover:opacity-90"
  },
  {
    title: "Gerenciar Contatos",
    description: "Organizar suas listas",
    icon: Users,
    action: "/contatos",
    variant: "outline" as const
  },
  {
    title: "Agendar Envio",
    description: "Programar campanhas",
    icon: Calendar,
    action: "/disparar?tipo=agendar",
    variant: "outline" as const
  },
  {
    title: "Ver Relatórios",
    description: "Análise de desempenho",
    icon: BarChart3,
    action: "/relatorios",
    variant: "outline" as const
  }
]

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <Card className="bg-gradient-card border-0 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="h-5 w-5" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant={action.variant}
                className={`h-auto p-4 justify-start text-left transition-all duration-200 hover:scale-[1.02] ${action.className || ""}`}
                onClick={() => navigate(action.action)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2 rounded-lg ${action.variant === 'default' ? 'bg-white/20' : 'bg-primary/10'}`}>
                    <Icon className={`h-5 w-5 ${action.variant === 'default' ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className={`text-xs ${action.variant === 'default' ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}