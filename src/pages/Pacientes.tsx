import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface Paciente {
    id: string
    nome: string
    email: string
    telefone: string
    dataNascimento: string
}

const initialPacientes: Paciente[] = [
    {
        id: '1',
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 99999-9999',
        dataNascimento: '1990-01-01'
    },
];

export function Pacientes() {
    const [pacientes] = useState<Paciente[]>(initialPacientes);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Pacientes</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo Paciente
                </Button>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Data de Nascimento</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pacientes.map((paciente) => (
                            <TableRow key={paciente.id}>
                                <TableCell>{paciente.nome}</TableCell>
                                <TableCell>{paciente.email}</TableCell>
                                <TableCell>{paciente.telefone}</TableCell>
                                <TableCell>{new Date(paciente.dataNascimento).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
} 