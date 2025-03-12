import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Appointment {
    id: string;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'cancelled';
}

const mockAppointments: Appointment[] = [
    {
        id: '1',
        doctorName: 'Dr. João Silva',
        specialty: 'Cardiologista',
        date: '2024-02-20',
        time: '14:30',
        status: 'scheduled'
    },
    {
        id: '2',
        doctorName: 'Dra. Maria Santos',
        specialty: 'Dermatologista',
        date: '2024-02-18',
        time: '15:00',
        status: 'completed'
    },
    {
        id: '3',
        doctorName: 'Dr. Carlos Oliveira',
        specialty: 'Clínico Geral',
        date: '2024-02-25',
        time: '09:00',
        status: 'scheduled'
    }
];

export function MyAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
    const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');

    const filteredAppointments = appointments.filter(appointment => 
        filter === 'all' || appointment.status === filter
    );

    const handleCancel = (appointmentId: string) => {
        setAppointments(prev =>
            prev.map(appointment =>
                appointment.id === appointmentId
                    ? { ...appointment, status: 'cancelled' as const }
                    : appointment
            )
        );
        toast.success('Consulta cancelada com sucesso');
    };

    const handleReschedule = () => {
        toast.success('Em breve você poderá remarcar suas consultas!');
    };

    const getStatusColor = (status: Appointment['status']) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: Appointment['status']) => {
        switch (status) {
            case 'scheduled':
                return 'Agendada';
            case 'completed':
                return 'Realizada';
            case 'cancelled':
                return 'Cancelada';
            default:
                return status;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Minhas Consultas</h1>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as typeof filter)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="all">Todas</option>
                    <option value="scheduled">Agendadas</option>
                    <option value="completed">Realizadas</option>
                    <option value="cancelled">Canceladas</option>
                </select>
            </div>

            <div className="space-y-4">
                {filteredAppointments.map(appointment => (
                    <div
                        key={appointment.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {appointment.doctorName}
                                </h3>
                                <p className="text-gray-600">{appointment.specialty}</p>
                                <p className="text-gray-600 mt-2">
                                    {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                                {getStatusText(appointment.status)}
                            </span>
                        </div>

                        {appointment.status === 'scheduled' && (
                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={() => handleReschedule()}
                                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    Remarcar
                                </button>
                                <button
                                    onClick={() => handleCancel(appointment.id)}
                                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {filteredAppointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        Nenhuma consulta encontrada
                    </div>
                )}
            </div>
        </div>
    );
} 