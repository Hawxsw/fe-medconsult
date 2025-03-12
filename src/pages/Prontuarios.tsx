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
import { PlusCircle, FileText, Eye } from "lucide-react"

interface Prontuario {
    id: string
    paciente: string
    dataConsulta: string
    medico: string
    especialidade: string
    status: 'Finalizado' | 'Em andamento'
}

const initialProntuarios: Prontuario[] = [
    {
        id: '1',
        paciente: 'João Silva',
        dataConsulta: '2024-03-15',
        medico: 'Dr. Carlos Santos',
        especialidade: 'Clínico Geral',
        status: 'Finalizado'
    },
    {
        id: '2',
        paciente: 'Maria Oliveira',
        dataConsulta: '2024-03-16',
        medico: 'Dra. Ana Paula',
        especialidade: 'Cardiologia',
        status: 'Em andamento'
    }
];

export function Prontuarios() {
    const [prontuarios] = useState<Prontuario[]>(initialProntuarios);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Prontuários</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo Prontuário
                </Button>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Paciente</TableHead>
                            <TableHead>Data da Consulta</TableHead>
                            <TableHead>Médico</TableHead>
                            <TableHead>Especialidade</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {prontuarios.map((prontuario) => (
                            <TableRow key={prontuario.id}>
                                <TableCell>{prontuario.paciente}</TableCell>
                                <TableCell>{new Date(prontuario.dataConsulta).toLocaleDateString()}</TableCell>
                                <TableCell>{prontuario.medico}</TableCell>
                                <TableCell>{prontuario.especialidade}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-sm ${prontuario.status === 'Finalizado'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {prontuario.status}
                                    </span>
                                </TableCell>
                                <TableCell className="space-x-2">
                                    <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4 mr-1" />
                                        Visualizar
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <FileText className="h-4 w-4 mr-1" />
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