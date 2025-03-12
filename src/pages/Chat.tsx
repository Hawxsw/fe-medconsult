import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Mensagem {
    id: string
    remetente: string
    conteudo: string
    timestamp: Date
    avatar: string
}

interface Contato {
    id: string
    nome: string
    avatar: string
    ultimaMensagem: string
    online: boolean
}

export function Chat() {
    const [mensagens, setMensagens] = useState<Mensagem[]>([
        {
            id: '1',
            remetente: 'Dr. Carlos Santos',
            conteudo: 'Bom dia! Poderia me ajudar com um diagnóstico?',
            timestamp: new Date('2024-03-15T09:00:00'),
            avatar: 'https://github.com/shadcn.png'
        },
        {
            id: '2',
            remetente: 'Você',
            conteudo: 'Claro! Pode me passar mais detalhes do caso?',
            timestamp: new Date('2024-03-15T09:02:00'),
            avatar: 'https://github.com/shadcn.png'
        }
    ])

    const [contatos] = useState<Contato[]>([
        {
            id: '1',
            nome: 'Dr. Carlos Santos',
            avatar: 'https://github.com/shadcn.png',
            ultimaMensagem: 'Bom dia! Poderia me ajudar com um diagnóstico?',
            online: true
        },
        {
            id: '2',
            nome: 'Dra. Ana Paula',
            avatar: 'https://github.com/shadcn.png',
            ultimaMensagem: 'Ok, vou analisar o caso',
            online: false
        }
    ])

    const [mensagemAtual, setMensagemAtual] = useState('')

    const enviarMensagem = () => {
        if (mensagemAtual.trim()) {
            const novaMensagem: Mensagem = {
                id: Date.now().toString(),
                remetente: 'Você',
                conteudo: mensagemAtual,
                timestamp: new Date(),
                avatar: 'https://github.com/shadcn.png'
            }
            setMensagens([...mensagens, novaMensagem])
            setMensagemAtual('')
        }
    }

    return (
        <div className="p-6 h-[calc(100vh-4rem)]">
            <div className="flex h-full gap-4">
                <div className="w-80 bg-white rounded-lg border">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold mb-4">Conversas</h2>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Buscar contato"
                                className="pl-8"
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto h-[calc(100%-5rem)]">
                        {contatos.map((contato) => (
                            <div
                                key={contato.id}
                                className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b"
                            >
                                <div className="relative">
                                    <Avatar>
                                        <AvatarImage src={contato.avatar} />
                                        <AvatarFallback>{contato.nome[0]}</AvatarFallback>
                                    </Avatar>
                                    {contato.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium">{contato.nome}</p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {contato.ultimaMensagem}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-lg border flex flex-col">
                    <div className="p-4 border-b">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={contatos[0].avatar} />
                                <AvatarFallback>{contatos[0].nome[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-medium">{contatos[0].nome}</h2>
                                <p className="text-sm text-green-500">Online</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {mensagens.map((mensagem) => (
                            <div
                                key={mensagem.id}
                                className={`flex gap-3 ${mensagem.remetente === 'Você' ? 'justify-end' : ''
                                    }`}
                            >
                                {mensagem.remetente !== 'Você' && (
                                    <Avatar>
                                        <AvatarImage src={mensagem.avatar} />
                                        <AvatarFallback>{mensagem.remetente[0]}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={`max-w-[70%] ${mensagem.remetente === 'Você'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100'
                                        } rounded-lg p-3`}
                                >
                                    <p>{mensagem.conteudo}</p>
                                    <p className={`text-xs ${mensagem.remetente === 'Você'
                                            ? 'text-blue-100'
                                            : 'text-gray-500'
                                        } mt-1`}>
                                        {mensagem.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                                {mensagem.remetente === 'Você' && (
                                    <Avatar>
                                        <AvatarImage src={mensagem.avatar} />
                                        <AvatarFallback>{mensagem.remetente[0]}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                enviarMensagem()
                            }}
                            className="flex gap-2"
                        >
                            <Input
                                value={mensagemAtual}
                                onChange={(e) => setMensagemAtual(e.target.value)}
                                placeholder="Digite sua mensagem..."
                                className="flex-1"
                            />
                            <Button type="submit">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
} 