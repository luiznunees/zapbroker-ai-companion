import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  PlayCircle, 
  Search, 
  Star, 
  Clock, 
  CheckCircle, 
  BookOpen,
  Video,
  FileText,
  Users,
  Zap,
  Settings,
  CreditCard,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  category: string
  level: "iniciante" | "intermediario" | "avancado"
  thumbnail: string
  completed: boolean
  rating: number
  views: number
}

const TUTORIALS: Tutorial[] = [
  {
    id: "1",
    title: "Como criar sua primeira campanha",
    description: "Aprenda em menos de 3 minutos como configurar e disparar sua campanha",
    duration: "2min",
    category: "Introdução",
    level: "iniciante",
    thumbnail: "/api/placeholder/300/200",
    completed: true,
    rating: 4.8,
    views: 1250
  },
  {
    id: "2",
    title: "Conectando seu WhatsApp",
    description: "Passo a passo para conectar sua conta do WhatsApp com segurança",
    duration: "1min",
    category: "Introdução",
    level: "iniciante",
    thumbnail: "/api/placeholder/300/200",
    completed: true,
    rating: 4.9,
    views: 2100
  },
  {
    id: "3",
    title: "Importando contatos via CSV",
    description: "Como importar grandes listas de contatos usando planilhas",
    duration: "4min",
    category: "Contatos",
    level: "intermediario",
    thumbnail: "/api/placeholder/300/200",
    completed: false,
    rating: 4.7,
    views: 890
  },
  {
    id: "4",
    title: "Agendamento inteligente de campanhas",
    description: "Maximize seus resultados escolhendo os melhores horários para envio",
    duration: "6min",
    category: "Disparos",
    level: "intermediario",
    thumbnail: "/api/placeholder/300/200",
    completed: false,
    rating: 4.6,
    views: 650
  },
  {
    id: "5",
    title: "Usando IA para otimizar mensagens",
    description: "Recursos avançados de inteligência artificial para corretores Pro",
    duration: "8min",
    category: "Recursos Avançados",
    level: "avancado",
    thumbnail: "/api/placeholder/300/200",
    completed: false,
    rating: 4.9,
    views: 420
  },
  {
    id: "6",
    title: "Configurações de segurança",
    description: "Proteja sua conta e evite bloqueios no WhatsApp",
    duration: "5min",
    category: "Configurações",
    level: "intermediario",
    thumbnail: "/api/placeholder/300/200",
    completed: false,
    rating: 4.8,
    views: 780
  }
]

const CATEGORIES = [
  { id: "all", name: "Todos", icon: BookOpen },
  { id: "Introdução", name: "Introdução", icon: PlayCircle },
  { id: "Contatos", name: "Contatos", icon: Users },
  { id: "Disparos", name: "Disparos", icon: Zap },
  { id: "Configurações", name: "Configurações", icon: Settings },
  { id: "Recursos Avançados", name: "Avançado", icon: Star }
]

const LEVELS = [
  { id: "all", name: "Todos" },
  { id: "iniciante", name: "Iniciante" },
  { id: "intermediario", name: "Intermediário" },
  { id: "avancado", name: "Avançado" }
]

export default function TutorialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const filteredTutorials = TUTORIALS.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tutorial.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || tutorial.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const completedCount = TUTORIALS.filter(t => t.completed).length
  const totalCount = TUTORIALS.length
  const progressPercentage = (completedCount / totalCount) * 100

  const getLevelBadge = (level: Tutorial["level"]) => {
    switch (level) {
      case "iniciante":
        return <Badge className="bg-success/10 text-success border-success/20">Iniciante</Badge>
      case "intermediario":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Intermediário</Badge>
      case "avancado":
        return <Badge className="bg-danger/10 text-danger border-danger/20">Avançado</Badge>
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Aprenda a usar o ZapBroker</h1>
        <p className="text-muted-foreground">
          Assista tutoriais rápidos e fáceis para dominar a plataforma
        </p>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-primary border-0 shadow-elegant text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Seu Progresso</h3>
              <p className="text-primary-foreground/80 mb-4">
                {completedCount} de {totalCount} tutoriais concluídos
              </p>
              <div className="w-64 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{progressPercentage.toFixed(0)}%</div>
              <p className="text-primary-foreground/80 text-sm">Completo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por módulo ou palavra-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2">
            {CATEGORIES.map(category => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>
          
          <div className="border-l border-border pl-3 ml-3">
            {LEVELS.map(level => (
              <Button
                key={level.id}
                variant={selectedLevel === level.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level.id)}
                className="mr-2"
              >
                {level.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Most Watched Section */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Mais Assistidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TUTORIALS.slice(0, 3).map((tutorial) => (
              <div key={tutorial.id} className="group cursor-pointer">
                <div className="relative mb-3 overflow-hidden rounded-lg">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {tutorial.duration}
                  </div>
                  {tutorial.completed && (
                    <div className="absolute top-2 left-2 bg-success text-success-foreground rounded-full p-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">
                  {tutorial.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{tutorial.views} visualizações</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    {tutorial.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tutorials Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            Todos os Tutoriais ({filteredTutorials.length})
          </h2>
        </div>

        {filteredTutorials.length === 0 ? (
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum tutorial encontrado</h3>
              <p className="text-muted-foreground">
                Tente buscar por um termo diferente ou altere os filtros
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-200 group cursor-pointer">
                <div className="relative">
                  <div className="aspect-video bg-muted flex items-center justify-center rounded-t-lg overflow-hidden">
                    <PlayCircle className="h-16 w-16 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {tutorial.duration}
                  </div>
                  {tutorial.completed && (
                    <div className="absolute top-2 left-2 bg-success text-success-foreground rounded-full p-1.5">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {getLevelBadge(tutorial.level)}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-fit text-xs">
                      {tutorial.category}
                    </Badge>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tutorial.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span>{tutorial.views} views</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        {tutorial.rating}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <PlayCircle className="h-4 w-4" />
                      {tutorial.completed ? "Assistir novamente" : "Assistir"}
                    </Button>
                  </div>
                  
                  {tutorial.completed && (
                    <div className="flex items-center justify-center gap-4 pt-2 border-t">
                      <span className="text-xs text-muted-foreground">Esse tutorial foi útil?</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}