import { useState } from "react"
import { Bell, ChevronDown, Wifi, WifiOff, AlertTriangle, User, LogOut, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data - seria substituído por estado real
const mockUser = {
  name: "Luis Fernando",
  plan: "Plano Starter",
  messagesUsed: 1250,
  messagesTotal: 2000
}

type WhatsAppStatus = "connected" | "reconnect" | "disconnected"

export function AppHeader() {
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsAppStatus>("connected")
  const [showQR, setShowQR] = useState(false)
  const [qrBlurred, setQrBlurred] = useState(true)

  const getStatusConfig = (status: WhatsAppStatus) => {
    switch (status) {
      case "connected":
        return {
          icon: Wifi,
          color: "bg-whatsapp-connected",
          text: "Conectado",
          description: "Você está conectado! Pode começar a enviar suas mensagens."
        }
      case "reconnect":
        return {
          icon: AlertTriangle,
          color: "bg-whatsapp-reconnect",
          text: "Reconectar",
          description: "Sua sessão está instável. Recomendamos reconectar."
        }
      case "disconnected":
        return {
          icon: WifiOff,
          color: "bg-whatsapp-disconnected",
          text: "Conectar",
          description: "Conecte-se para começar a enviar mensagens."
        }
    }
  }

  const statusConfig = getStatusConfig(whatsappStatus)
  const StatusIcon = statusConfig.icon
  const usagePercentage = (mockUser.messagesUsed / mockUser.messagesTotal) * 100

  return (
    <header className="h-16 border-b border-border bg-gradient-subtle flex items-center justify-between px-6 shadow-card">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground transition-colors" />
      </div>

      <div className="flex items-center gap-6">
        {/* Status do Plano */}
        <div className="hidden md:flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">
            {mockUser.messagesUsed} de {mockUser.messagesTotal} mensagens
          </span>
          <Progress value={usagePercentage} className="w-24 h-2" />
        </div>

        {/* Botão WhatsApp */}
        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogTrigger asChild>
            <Button 
              className={`${statusConfig.color} hover:opacity-90 text-white gap-2 transition-all`}
              size="sm"
            >
              <StatusIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{statusConfig.text}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <StatusIcon className="h-5 w-5" />
                WhatsApp - {statusConfig.text}
              </DialogTitle>
              <DialogDescription>
                {statusConfig.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div 
                  className={`w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${
                    qrBlurred ? "blur-sm" : ""
                  }`}
                >
                  <span className="text-gray-500 text-sm">QR Code Aqui</span>
                </div>
                {qrBlurred && (
                  <Button 
                    className="absolute inset-0 m-auto w-fit h-fit"
                    onClick={() => setQrBlurred(false)}
                  >
                    Mostrar QR Code
                  </Button>
                )}
              </div>
              
              {!qrBlurred && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    QR Code válido por: <span className="font-medium">30s</span>
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setQrBlurred(true)}>
                    Atualizar QR
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Notificações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2">
              <h4 className="font-medium mb-2">Notificações</h4>
              <div className="space-y-2">
                <div className="p-2 text-sm bg-accent/50 rounded">
                  <p className="font-medium">Campanha enviada!</p>
                  <p className="text-muted-foreground">150 mensagens enviadas com sucesso</p>
                </div>
                <div className="p-2 text-sm">
                  <p className="font-medium">Lista atualizada</p>
                  <p className="text-muted-foreground">5 novos contatos adicionados</p>
                </div>
              </div>
              <Button variant="link" className="w-full mt-2 p-0 h-auto">
                Ver todas
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Perfil do Usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Olá, {mockUser.name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground">{mockUser.plan}</p>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="h-4 w-4 mr-2" />
              Meu Plano
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}