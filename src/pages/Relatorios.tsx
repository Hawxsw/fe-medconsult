import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    BarChart3,
    Users,
    Calendar,
    TrendingUp,
    Download
} from "lucide-react"

export function Relatorios() {
    const relatorios = [
        {
            titulo: "Consultas por Período",
            descricao: "Análise detalhada das consultas realizadas por período",
            icon: Calendar
        },
        {
            titulo: "Pacientes Ativos",
            descricao: "Relatório de pacientes ativos e inativos",
            icon: Users
        },
        {
            titulo: "Desempenho Mensal",
            descricao: "Métricas de desempenho e produtividade",
            icon: TrendingUp
        },
        {
            titulo: "Estatísticas Gerais",
            descricao: "Dados estatísticos gerais da clínica",
            icon: BarChart3
        }
    ]

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Relatórios</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatorios.map((relatorio, index) => {
                    const Icon = relatorio.icon
                    return (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center space-y-0 gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Icon className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{relatorio.titulo}</CardTitle>
                                    <CardDescription>{relatorio.descricao}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Gerar Relatório
                                </Button>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
} 