import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Settings,
    User,
    Building2,
    Bell,
    Shield,
    Mail
} from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function Configuracoes() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
                <Settings className="h-8 w-8 text-gray-600" />
                <h1 className="text-3xl font-bold">Configurações</h1>
            </div>

            <Tabs defaultValue="perfil" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-4">
                    <TabsTrigger value="perfil">Perfil</TabsTrigger>
                    <TabsTrigger value="clinica">Clínica</TabsTrigger>
                    <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                    <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>

                <TabsContent value="perfil" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Informações do Perfil
                            </CardTitle>
                            <CardDescription>
                                Atualize suas informações pessoais
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nome">Nome</Label>
                                    <Input id="nome" placeholder="Seu nome" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="seu@email.com" />
                                </div>
                            </div>
                            <Button>Salvar Alterações</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="clinica" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Informações da Clínica
                            </CardTitle>
                            <CardDescription>
                                Configure as informações da sua clínica
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="clinica-nome">Nome da Clínica</Label>
                                    <Input id="clinica-nome" placeholder="Nome da clínica" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefone">Telefone</Label>
                                    <Input id="telefone" placeholder="(00) 0000-0000" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endereco">Endereço</Label>
                                <Input id="endereco" placeholder="Endereço da clínica" />
                            </div>
                            <Button>Salvar Alterações</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notificacoes" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Preferências de Notificação
                            </CardTitle>
                            <CardDescription>
                                Gerencie suas notificações
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Notificações por Email</Label>
                                        <p className="text-sm text-gray-500">
                                            Receba atualizações por email
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Lembretes de Consulta</Label>
                                        <p className="text-sm text-gray-500">
                                            Notificações de consultas agendadas
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                            <Button>Salvar Preferências</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seguranca" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Segurança
                            </CardTitle>
                            <CardDescription>
                                Gerencie sua senha e segurança da conta
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="senha-atual">Senha Atual</Label>
                                    <Input id="senha-atual" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nova-senha">Nova Senha</Label>
                                    <Input id="nova-senha" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                                    <Input id="confirmar-senha" type="password" />
                                </div>
                            </div>
                            <Button>Alterar Senha</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Configurações de Email
                            </CardTitle>
                            <CardDescription>
                                Configure as configurações de email do sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-host">Servidor SMTP</Label>
                                    <Input id="smtp-host" placeholder="smtp.exemplo.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtp-porta">Porta</Label>
                                    <Input id="smtp-porta" placeholder="587" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email-remetente">Email do Remetente</Label>
                                <Input id="email-remetente" type="email" placeholder="no-reply@suaclinica.com" />
                            </div>
                            <Button>Testar Conexão</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
} 