import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Clock, 
  Calendar, 
  MessageSquare, 
  Users, 
  Settings, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Send,
  Zap,
  Shield,
  Brain,
  Wrench,
  FlaskConical,
  Sparkles
} from "lucide-react"

interface DispatchConfig {
  type: "immediate" | "scheduled"
  message: string
  contactList: string
  sendMode: string
  scheduleDate?: string
  scheduleTime?: string
  customConfig?: {
    messagesPerBatch: number
    intervalBetweenBatches: number
    useAI: boolean
  }
}

const SEND_MODES = [
  {
    id: "safe",
    name: "Modo Seguro",
    icon: Shield,
    description: "Ideal para evitar bloqueios",
    details: "5 mensagens a cada 60 segundos, até 100/hora",
    recommended: true
  },
  {
    id: "fast", 
    name: "Modo Rápido",
    icon: Zap,
    description: "Para contas validadas",
    details: "10 mensagens a cada 30 segundos, ~1000/hora"
  },
  {
    id: "ai",
    name: "Modo IA Otimizado",
    icon: Brain,
    description: "Exclusivo para planos com IA",
    details: "Planejamento com IA, 25 msgs a cada 20s",
    premium: true
  },
  {
    id: "balanced",
    name: "Modo Balanceado", 
    icon: Settings,
    description: "Intermediário",
    details: "8 mensagens a cada 40 segundos, ~700/hora"
  },
  {
    id: "test",
    name: "Modo de Teste",
    icon: FlaskConical,
    description: "Para testes",
    details: "3 mensagens a cada 120 segundos"
  },
  {
    id: "custom",
    name: "Modo Personalizado",
    icon: Wrench,
    description: "Configure manualmente",
    details: "Defina seus próprios parâmetros"
  }
]

const MOCK_CONTACT_LISTS = [
  { id: "1", name: "Clientes Quentes", count: 153 },
  { id: "2", name: "Leads Agosto", count: 287 },
  { id: "3", name: "Follow-up Interessados", count: 95 },
  { id: "4", name: "Novos Cadastros", count: 64 }
]

export default function DispatchPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState<DispatchConfig>({
    type: "immediate",
    message: "",
    contactList: "",
    sendMode: "safe"
  })
  const [isDispatching, setIsDispatching] = useState(false)
  const [dispatchProgress, setDispatchProgress] = useState(0)

  const steps = [
    { number: 1, title: "Tipo de Disparo", icon: Clock },
    { number: 2, title: "Mensagem", icon: MessageSquare },
    { number: 3, title: "Contatos", icon: Users },
    { number: 4, title: "Configuração", icon: Settings },
    ...(config.type === "scheduled" ? [{ number: 5, title: "Agendamento", icon: Calendar }] : []),
    { number: config.type === "scheduled" ? 6 : 5, title: "Revisão", icon: CheckCircle },
    { number: config.type === "scheduled" ? 7 : 6, title: "Execução", icon: Send }
  ]

  const currentStepData = steps[currentStep - 1]
  const totalSteps = steps.length

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const startDispatch = () => {
    setIsDispatching(true)
    setCurrentStep(totalSteps)
    
    // Simular progresso do envio
    const interval = setInterval(() => {
      setDispatchProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 1000)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return true // sempre pode proceder da primeira etapa
      case 2: return config.message.trim() !== ""
      case 3: return config.contactList !== ""
      case 4: return config.sendMode !== ""
      case 5: 
        if (config.type === "scheduled") {
          return config.scheduleDate && config.scheduleTime
        }
        return true
      default: return true
    }
  }

  if (isDispatching) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Acompanhe seu envio em tempo real</h1>
          <p className="text-muted-foreground">Campanha sendo executada com sucesso</p>
        </div>

        <Card className="bg-gradient-card shadow-elegant">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enviando mensagens...</h3>
              <p className="text-muted-foreground">Campanha: "Mensagem de Marketing"</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span>Progresso do envio</span>
                <span>{dispatchProgress}%</span>
              </div>
              <Progress value={dispatchProgress} className="h-3" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-success">{Math.floor((dispatchProgress / 100) * 153)}</p>
                  <p className="text-xs text-muted-foreground">Enviadas</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-muted-foreground">{153 - Math.floor((dispatchProgress / 100) * 153)}</p>
                  <p className="text-xs text-muted-foreground">Restantes</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-primary">2</p>
                  <p className="text-xs text-muted-foreground">Falhas</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-warning">~5min</p>
                  <p className="text-xs text-muted-foreground">Restante</p>
                </div>
              </div>
            </div>

            {dispatchProgress === 100 && (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Campanha finalizada com sucesso! 🎉</h3>
                <p className="text-muted-foreground mb-4">
                  151 de 153 mensagens enviadas (98.7% de sucesso)
                </p>
                <Button onClick={() => window.location.reload()} className="bg-gradient-primary">
                  Fazer novo disparo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Criar nova campanha</h1>
        <p className="text-muted-foreground">Configure sua mensagem e envie para seus contatos</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                currentStep >= step.number 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : "border-muted-foreground/30 text-muted-foreground"
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-8 mx-2 transition-all ${
                  currentStep > step.number ? "bg-primary" : "bg-muted-foreground/30"
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          {steps.map(step => (
            <span key={step.number} className="text-center w-10">
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="bg-gradient-card shadow-elegant mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <currentStepData.icon className="h-6 w-6" />
            {currentStepData.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Tipo de Disparo */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Como deseja disparar sua mensagem?</h3>
              <RadioGroup value={config.type} onValueChange={(value: "immediate" | "scheduled") => setConfig({...config, type: value})}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <RadioGroupItem value="immediate" id="immediate" />
                  <Label htmlFor="immediate" className="flex items-center gap-2 cursor-pointer">
                    <Zap className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Disparo imediato</p>
                      <p className="text-sm text-muted-foreground">Enviar mensagens agora</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="flex items-center gap-2 cursor-pointer">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Agendar envio</p>
                      <p className="text-sm text-muted-foreground">Programar para uma data específica</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 2: Mensagem */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Escreva a mensagem que será enviada</h3>
              <div className="space-y-3">
                <Textarea
                  placeholder="Digite sua mensagem aqui..."
                  value={config.message}
                  onChange={(e) => setConfig({...config, message: e.target.value})}
                  className="min-h-32"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {config.message.length}/1000 caracteres
                  </p>
                  <Button variant="outline" disabled className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Melhorar com IA (Pro)
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contatos */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Selecione a lista de contatos</h3>
              <Select value={config.contactList} onValueChange={(value) => setConfig({...config, contactList: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha uma lista salva" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CONTACT_LISTS.map(list => (
                    <SelectItem key={list.id} value={list.id}>
                      {list.name} ({list.count} contatos)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {config.contactList && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Lista selecionada:</h4>
                  <p className="text-sm text-muted-foreground">
                    {MOCK_CONTACT_LISTS.find(l => l.id === config.contactList)?.name} - {MOCK_CONTACT_LISTS.find(l => l.id === config.contactList)?.count} contatos válidos
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Configuração */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Configure o ritmo do envio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SEND_MODES.map(mode => {
                  const Icon = mode.icon
                  const isSelected = config.sendMode === mode.id
                  return (
                    <div
                      key={mode.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        isSelected ? "border-primary bg-primary/5" : "border-border"
                      } ${mode.premium ? "opacity-50" : ""}`}
                      onClick={() => !mode.premium && setConfig({...config, sendMode: mode.id})}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`h-6 w-6 mt-1 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{mode.name}</h4>
                            {mode.recommended && <Badge variant="secondary" className="text-xs">Recomendado</Badge>}
                            {mode.premium && <Badge variant="outline" className="text-xs">Pro</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{mode.description}</p>
                          <p className="text-xs text-muted-foreground">{mode.details}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 5: Agendamento (condicional) */}
          {currentStep === 5 && config.type === "scheduled" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quando deseja enviar?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={config.scheduleDate}
                    onChange={(e) => setConfig({...config, scheduleDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={config.scheduleTime}
                    onChange={(e) => setConfig({...config, scheduleTime: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5/6: Revisão */}
          {((currentStep === 5 && config.type === "immediate") || (currentStep === 6 && config.type === "scheduled")) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Revise seu disparo</h3>
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium mb-1">Tipo de envio:</h4>
                  <p className="text-sm text-muted-foreground">
                    {config.type === "immediate" ? "Disparo imediato" : `Agendado para ${config.scheduleDate} às ${config.scheduleTime}`}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Mensagem:</h4>
                  <p className="text-sm text-muted-foreground bg-background p-3 rounded border">
                    {config.message || "Nenhuma mensagem definida"}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Contatos:</h4>
                  <p className="text-sm text-muted-foreground">
                    {MOCK_CONTACT_LISTS.find(l => l.id === config.contactList)?.name} - {MOCK_CONTACT_LISTS.find(l => l.id === config.contactList)?.count} contatos
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Configuração:</h4>
                  <p className="text-sm text-muted-foreground">
                    {SEND_MODES.find(m => m.id === config.sendMode)?.name}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>

        <div className="text-sm text-muted-foreground">
          Etapa {currentStep} de {totalSteps}
        </div>

        {currentStep === totalSteps - 1 ? (
          <Button 
            onClick={startDispatch}
            disabled={!canProceed()}
            className="gap-2 bg-gradient-primary"
          >
            <Send className="h-4 w-4" />
            Fazer disparo
          </Button>
        ) : (
          <Button 
            onClick={nextStep}
            disabled={!canProceed()}
            className="gap-2"
          >
            Próxima etapa
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}