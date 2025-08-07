import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  CreditCard, 
  CheckCircle, 
  X, 
  Crown, 
  Zap, 
  Users, 
  MessageSquare,
  Brain,
  Calendar,
  ArrowUp,
  ExternalLink
} from "lucide-react"

const CURRENT_PLAN = {
  name: "Starter",
  price: "R$ 49",
  period: "/mês",
  status: "Ativo",
  renewalDate: "2024-09-07",
  paymentMethod: "Cartão final 1234"
}

const USAGE_STATS = {
  messages: { used: 1250, total: 2000 },
  contacts: { used: 420, total: 1000 },
  campaigns: { used: 3, total: 10 },
  aiFeatures: { used: 0, total: 0, available: false }
}

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 49",
    period: "/mês",
    description: "Ideal para quem está começando",
    features: [
      { name: "2.000 mensagens/mês", included: true },
      { name: "1.000 contatos", included: true },
      { name: "10 campanhas", included: true },
      { name: "Suporte por email", included: true },
      { name: "Recursos com IA", included: false },
      { name: "Relatórios avançados", included: false },
      { name: "Integração API", included: false }
    ],
    popular: false,
    current: true
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 149",
    period: "/mês",
    description: "Para corretores profissionais",
    features: [
      { name: "10.000 mensagens/mês", included: true },
      { name: "5.000 contatos", included: true },
      { name: "50 campanhas", included: true },
      { name: "Recursos com IA", included: true },
      { name: "Relatórios avançados", included: true },
      { name: "Suporte prioritário", included: true },
      { name: "Integração API", included: false }
    ],
    popular: true,
    current: false
  },
  {
    id: "master",
    name: "Master",
    price: "R$ 299",
    period: "/mês",
    description: "Para equipes e imobiliárias",
    features: [
      { name: "50.000 mensagens/mês", included: true },
      { name: "Contatos ilimitados", included: true },
      { name: "Campanhas ilimitadas", included: true },
      { name: "Recursos com IA", included: true },
      { name: "Relatórios avançados", included: true },
      { name: "Integração API completa", included: true },
      { name: "Suporte 24/7", included: true }
    ],
    popular: false,
    current: false
  }
]

const RECENT_INVOICES = [
  { date: "2024-08-07", amount: "R$ 49,00", method: "Cartão", status: "Paga" },
  { date: "2024-07-07", amount: "R$ 49,00", method: "Cartão", status: "Paga" },
  { date: "2024-06-07", amount: "R$ 49,00", method: "Cartão", status: "Paga" }
]

export default function PlanPage() {
  const messagesPercentage = (USAGE_STATS.messages.used / USAGE_STATS.messages.total) * 100
  const contactsPercentage = (USAGE_STATS.contacts.used / USAGE_STATS.contacts.total) * 100
  const campaignsPercentage = (USAGE_STATS.campaigns.used / USAGE_STATS.campaigns.total) * 100

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Meu Plano</h1>
        <p className="text-muted-foreground">
          Gerencie sua assinatura e acompanhe o uso dos recursos
        </p>
      </div>

      {/* Current Plan Summary */}
      <Card className="bg-gradient-primary border-0 shadow-elegant text-primary-foreground">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Crown className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">Plano {CURRENT_PLAN.name}</h2>
                  <p className="text-primary-foreground/80">
                    {CURRENT_PLAN.price}{CURRENT_PLAN.period} • {CURRENT_PLAN.status}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-primary-foreground/80">
                <p>Renovação: {new Date(CURRENT_PLAN.renewalDate).toLocaleDateString()}</p>
                <p>Pagamento: {CURRENT_PLAN.paymentMethod}</p>
              </div>
            </div>
            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              Gerenciar Assinatura
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Mensagens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold">{USAGE_STATS.messages.used.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">
                  de {USAGE_STATS.messages.total.toLocaleString()}
                </span>
              </div>
              <Progress value={messagesPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {(100 - messagesPercentage).toFixed(0)}% disponível este mês
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-5 w-5" />
              Contatos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold">{USAGE_STATS.contacts.used.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">
                  de {USAGE_STATS.contacts.total.toLocaleString()}
                </span>
              </div>
              <Progress value={contactsPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {USAGE_STATS.contacts.total - USAGE_STATS.contacts.used} contatos disponíveis
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Campanhas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold">{USAGE_STATS.campaigns.used}</span>
                <span className="text-sm text-muted-foreground">
                  de {USAGE_STATS.campaigns.total}
                </span>
              </div>
              <Progress value={campaignsPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {USAGE_STATS.campaigns.total - USAGE_STATS.campaigns.used} campanhas disponíveis
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Benefits */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Benefícios do Seu Plano
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PLANS.find(p => p.current)?.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                {feature.included ? (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                  {feature.name}
                </span>
                {!feature.included && (
                  <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                    Liberar
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Planos Disponíveis</h2>
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Comparar planos
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative bg-gradient-card shadow-card transition-all duration-200 hover:shadow-hover ${
                plan.popular ? "ring-2 ring-primary" : ""
              } ${plan.current ? "opacity-50" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Mais Popular
                </Badge>
              )}
              {plan.current && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-success text-success-foreground">
                  Plano Atual
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {feature.included ? (
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${plan.current ? "opacity-50 pointer-events-none" : ""} ${
                    plan.popular ? "bg-gradient-primary" : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  disabled={plan.current}
                >
                  {plan.current ? "Plano Atual" : (
                    <>
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Fazer Upgrade
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Invoices */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Histórico de Pagamentos
            </CardTitle>
            <Button variant="link" className="text-primary">
              Ver todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {RECENT_INVOICES.map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{invoice.amount}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString()} • {invoice.method}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-success text-success-foreground text-xs">
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="gap-2 h-auto p-4 justify-start">
          <ArrowUp className="h-5 w-5 text-primary" />
          <div className="text-left">
            <p className="font-medium">Mudar Plano</p>
            <p className="text-xs text-muted-foreground">Upgrade ou downgrade</p>
          </div>
        </Button>
        
        <Button variant="outline" className="gap-2 h-auto p-4 justify-start">
          <CreditCard className="h-5 w-5 text-primary" />
          <div className="text-left">
            <p className="font-medium">Alterar Pagamento</p>
            <p className="text-xs text-muted-foreground">Cartão ou método</p>
          </div>
        </Button>
        
        <Button variant="outline" className="gap-2 h-auto p-4 justify-start">
          <ExternalLink className="h-5 w-5 text-primary" />
          <div className="text-left">
            <p className="font-medium">Ver Faturas</p>
            <p className="text-xs text-muted-foreground">Histórico completo</p>
          </div>
        </Button>
        
        <Button variant="outline" className="gap-2 h-auto p-4 justify-start">
          <Brain className="h-5 w-5 text-primary" />
          <div className="text-left">
            <p className="font-medium">Ver Limites</p>
            <p className="text-xs text-muted-foreground">Uso detalhado</p>
          </div>
        </Button>
      </div>
    </div>
  )
}