import { Users, MessageSquare, Target, TrendingUp, Calendar, Clock } from "lucide-react"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const mockUser = {
  name: "Luis Fernando",
  plan: "Starter"
}

const mockStats = {
  contacts: 1283,
  messagesSent: 1080,
  messagesTotal: 3000,
  campaigns: 2,
  maxCampaigns: 10
}

const nextScheduled = {
  campaign: "Follow-up Clientes Interessados",
  contacts: 156,
  scheduledFor: "Hoje às 16:00",
  status: "Programado"
}

export default function Dashboard() {
  const messagesProgress = (mockStats.messagesSent / mockStats.messagesTotal) * 100
  const campaignsProgress = (mockStats.campaigns / mockStats.maxCampaigns) * 100

  return (
    <div className="p-6 space-y-6 bg-gradient-subtle min-h-full">
      {/* Saudação */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Olá, {mockUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta ao seu painel ZapBroker
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Plano {mockUser.plan}
          </Badge>
          <Button variant="link" className="text-primary">
            Ver plano
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Contatos na Plataforma"
          value={mockStats.contacts}
          description="+12 novos esta semana"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Mensagens Enviadas"
          value={mockStats.messagesSent}
          maxValue={mockStats.messagesTotal}
          description={`${(100 - messagesProgress).toFixed(0)}% disponível`}
          icon={MessageSquare}
          progress={messagesProgress}
        />
        <StatsCard
          title="Campanhas Ativas"
          value={mockStats.campaigns}
          maxValue={mockStats.maxCampaigns}
          description="2 em andamento"
          icon={Target}
          progress={campaignsProgress}
        />
        <StatsCard
          title="Taxa de Sucesso"
          value="94.2%"
          description="+2.1% vs mês anterior"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Seção Principal - Duas Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda - Ações e Próximo Agendamento */}
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          
          {/* Próximo Agendamento */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5" />
                Próximo Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    {nextScheduled.campaign}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {nextScheduled.contacts} contatos
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {nextScheduled.scheduledFor}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {nextScheduled.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita - Atividade Recente */}
        <div className="space-y-6">
          <RecentActivity />
          
          {/* Dicas e Sugestões */}
          <Card className="bg-gradient-success border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div className="text-white">
                  <h4 className="font-semibold mb-2">💡 Dica do Dia</h4>
                  <p className="text-sm text-white/90 mb-3">
                    Utilize listas segmentadas para campanhas mais eficazes. 
                    Clientes interessados respondem 3x mais.
                  </p>
                  <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                    Saiba mais
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Banner Promocional */}
      <Card className="bg-gradient-primary border-0 shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">🎁 Convide e Ganhe!</h3>
              <p className="text-white/90">
                Convide 3 corretores e ganhe 30% de desconto no próximo mês
              </p>
            </div>
            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              Começar convites
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}