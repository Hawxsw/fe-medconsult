import { useState } from 'react'
import { FiSettings, FiPlus, FiClock } from 'react-icons/fi'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

const appointments = [
    {
        id: 1,
        patient: 'Maria Silva',
        date: '2024-03-20',
        time: '09:00',
        type: 'Consulta de Rotina',
        status: 'confirmed',
        avatar: 'https://ui-avatars.com/api/?name=Maria+Silva&background=0D8ABC&color=fff'
    },
    {
        id: 2,
        patient: 'João Santos',
        date: '2024-03-20',
        time: '10:30',
        type: 'Retorno',
        status: 'pending',
        avatar: 'https://ui-avatars.com/api/?name=João+Santos&background=0D8ABC&color=fff'
    },
]

const Agendamentos = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const getStatusText = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'Confirmado'
            case 'pending':
                return 'Pendente'
            case 'cancelled':
                return 'Cancelado'
            default:
                return status
        }
    }

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Agendamentos</h1>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <FiPlus className="mr-2 h-4 w-4" />
                    Novo Agendamento
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-white">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-gray-900">Calendário</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border shadow-sm"
                        />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-white">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-gray-900">Consultas do Dia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {appointments.map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                            <AvatarImage src={appointment.avatar} />
                                            <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-900">{appointment.patient}</p>
                                            <div className="flex items-center text-gray-500">
                                                <FiClock className="mr-1 h-4 w-4" />
                                                <span>{appointment.time} - {appointment.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge
                                            variant={appointment.status === 'confirmed' ? 'success' : 'warning'}
                                            className="px-3 py-1"
                                        >
                                            {getStatusText(appointment.status)}
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-gray-200"
                                        >
                                            <FiSettings className="h-4 w-4 text-gray-600" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Agendamentos 