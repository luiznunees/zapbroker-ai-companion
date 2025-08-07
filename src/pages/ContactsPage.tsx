import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Download, 
  Search,
  FileSpreadsheet,
  UserPlus,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactList {
  id: string
  name: string
  contacts: Contact[]
  createdAt: string
  lastUsed?: string
}

interface Contact {
  id: string
  name: string
  phone: string
  status: "valid" | "invalid" | "duplicate"
}

const MOCK_LISTS: ContactList[] = [
  {
    id: "1",
    name: "Clientes Quentes",
    contacts: [
      { id: "1", name: "João Silva", phone: "(11) 99999-9999", status: "valid" },
      { id: "2", name: "Maria Santos", phone: "(11) 88888-8888", status: "valid" },
      { id: "3", name: "Pedro Costa", phone: "(11) 77777-7777", status: "duplicate" }
    ],
    createdAt: "2024-08-01",
    lastUsed: "2024-08-07"
  },
  {
    id: "2", 
    name: "Leads Agosto",
    contacts: [
      { id: "4", name: "Ana Oliveira", phone: "(11) 66666-6666", status: "valid" },
      { id: "5", name: "Carlos Lima", phone: "(11) 55555-5555", status: "valid" }
    ],
    createdAt: "2024-08-01"
  }
]

export default function ContactsPage() {
  const [lists, setLists] = useState<ContactList[]>(MOCK_LISTS)
  const [selectedList, setSelectedList] = useState<ContactList | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const { toast } = useToast()

  const filteredLists = lists.filter(list => 
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const createNewList = () => {
    if (!newListName.trim()) return

    const newList: ContactList = {
      id: Date.now().toString(),
      name: newListName,
      contacts: [],
      createdAt: new Date().toISOString().split('T')[0]
    }

    setLists([...lists, newList])
    setNewListName("")
    setIsCreateModalOpen(false)
    setSelectedList(newList)
    
    toast({
      title: "Lista criada com sucesso!",
      description: `A lista "${newListName}" foi criada.`
    })
  }

  const deleteList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId))
    if (selectedList?.id === listId) {
      setSelectedList(null)
    }
    toast({
      title: "Lista excluída",
      description: "A lista foi removida com sucesso."
    })
  }

  const addContact = () => {
    if (!selectedList) return

    const newContact: Contact = {
      id: Date.now().toString(),
      name: "",
      phone: "",
      status: "valid"
    }

    const updatedList = {
      ...selectedList,
      contacts: [...selectedList.contacts, newContact]
    }

    setLists(lists.map(list => 
      list.id === selectedList.id ? updatedList : list
    ))
    setSelectedList(updatedList)
    setEditingContact(newContact)
  }

  const updateContact = (contactId: string, updates: Partial<Contact>) => {
    if (!selectedList) return

    const updatedContacts = selectedList.contacts.map(contact =>
      contact.id === contactId ? { ...contact, ...updates } : contact
    )

    const updatedList = {
      ...selectedList,
      contacts: updatedContacts
    }

    setLists(lists.map(list =>
      list.id === selectedList.id ? updatedList : list
    ))
    setSelectedList(updatedList)
  }

  const deleteContact = (contactId: string) => {
    if (!selectedList) return

    const updatedList = {
      ...selectedList,
      contacts: selectedList.contacts.filter(contact => contact.id !== contactId)
    }

    setLists(lists.map(list =>
      list.id === selectedList.id ? updatedList : list
    ))
    setSelectedList(updatedList)
  }

  const getStatusIcon = (status: Contact["status"]) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "invalid":
      case "duplicate":
        return <AlertCircle className="h-4 w-4 text-danger" />
    }
  }

  const getStatusBadge = (status: Contact["status"]) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-success text-success-foreground">Válido</Badge>
      case "invalid":
        return <Badge className="bg-danger text-danger-foreground">Inválido</Badge>
      case "duplicate":
        return <Badge className="bg-warning text-warning-foreground">Duplicado</Badge>
    }
  }

  if (selectedList) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header da Lista */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button 
              variant="link" 
              onClick={() => setSelectedList(null)}
              className="p-0 h-auto text-primary mb-2"
            >
              ← Voltar para todas as listas
            </Button>
            <h1 className="text-3xl font-bold">{selectedList.name}</h1>
            <p className="text-muted-foreground">
              {selectedList.contacts.length} contatos • Criada em {new Date(selectedList.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button onClick={addContact} className="gap-2 bg-gradient-primary">
              <UserPlus className="h-4 w-4" />
              Adicionar contato
            </Button>
          </div>
        </div>

        {/* Tabela de Contatos */}
        <Card className="bg-gradient-card shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contatos da Lista
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {selectedList.contacts.filter(c => c.status === "valid").length} válidos de {selectedList.contacts.length}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedList.contacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nenhum contato nesta lista. Clique em "Adicionar contato" para começar.
                    </TableCell>
                  </TableRow>
                ) : (
                  selectedList.contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        {editingContact?.id === contact.id ? (
                          <Input 
                            value={contact.name}
                            onChange={(e) => updateContact(contact.id, { name: e.target.value })}
                            onBlur={() => setEditingContact(null)}
                            onKeyDown={(e) => e.key === 'Enter' && setEditingContact(null)}
                            autoFocus
                            placeholder="Nome do contato"
                          />
                        ) : (
                          <span 
                            onClick={() => setEditingContact(contact)}
                            className="cursor-pointer hover:text-primary"
                          >
                            {contact.name || "Sem nome"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={contact.phone}
                          onChange={(e) => updateContact(contact.id, { phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(contact.status)}
                          {getStatusBadge(contact.status)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteContact(contact.id)}
                          className="text-danger hover:text-danger hover:bg-danger/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciar Contatos</h1>
          <p className="text-muted-foreground">
            Organize suas listas de contatos para campanhas eficientes
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-primary">
              <Plus className="h-4 w-4" />
              Criar nova lista
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Lista</DialogTitle>
              <DialogDescription>
                Escolha como você quer criar sua nova lista de contatos
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="listName">Nome da lista</Label>
                <Input
                  id="listName"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Ex: Clientes Interessados"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  onClick={createNewList}
                  disabled={!newListName.trim()}
                  className="justify-start gap-3 h-auto p-4"
                >
                  <UserPlus className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Adicionar Manualmente</p>
                    <p className="text-sm text-muted-foreground">Digite os contatos um por um</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  disabled
                  className="justify-start gap-3 h-auto p-4 opacity-50"
                >
                  <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <p className="font-medium">Importar CSV</p>
                    <p className="text-sm text-muted-foreground">Upload de arquivo .csv (Em breve)</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  disabled
                  className="justify-start gap-3 h-auto p-4 opacity-50"
                >
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <p className="font-medium">Importar Excel</p>
                    <p className="text-sm text-muted-foreground">Upload de arquivo .xlsx (Em breve)</p>
                  </div>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar listas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Listas</p>
                <p className="text-2xl font-bold">{lists.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contatos Totais</p>
                <p className="text-2xl font-bold">
                  {lists.reduce((acc, list) => acc + list.contacts.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contatos Válidos</p>
                <p className="text-2xl font-bold">
                  {lists.reduce((acc, list) => 
                    acc + list.contacts.filter(c => c.status === "valid").length, 0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLists.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma lista encontrada</h3>
            <p className="text-muted-foreground mb-4">
              {lists.length === 0 
                ? "Comece criando sua primeira lista de contatos"
                : "Tente buscar por um termo diferente"
              }
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Criar primeira lista
            </Button>
          </div>
        ) : (
          filteredLists.map((list) => (
            <Card key={list.id} className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-200 cursor-pointer" onClick={() => setSelectedList(list)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{list.name}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedList(list)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteList(list.id)
                      }}
                      className="text-danger hover:text-danger hover:bg-danger/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Contatos:</span>
                    <span className="font-medium">{list.contacts.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Válidos:</span>
                    <span className="font-medium text-success">
                      {list.contacts.filter(c => c.status === "valid").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Criada em:</span>
                    <span className="font-medium">
                      {new Date(list.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {list.lastUsed && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Última vez:</span>
                      <span className="font-medium">
                        {new Date(list.lastUsed).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}