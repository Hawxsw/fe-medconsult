import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
}

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
}

// Mock data
const mockDoctor: Doctor = {
    id: '1',
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
};

const mockTimeSlots: TimeSlot[] = [
    { id: '1', time: '09:00', available: true },
    { id: '2', time: '09:30', available: false },
    { id: '3', time: '10:00', available: true },
    { id: '4', time: '10:30', available: true },
    { id: '5', time: '11:00', available: false },
    { id: '6', time: '11:30', available: true },
    { id: '7', time: '14:00', available: true },
    { id: '8', time: '14:30', available: false },
    { id: '9', time: '15:00', available: true },
    { id: '10', time: '15:30', available: true },
];

export function NewAppointment() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

    // Get tomorrow's date as the minimum selectable date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    const handleSchedule = () => {
        if (!selectedDate || !selectedTimeSlot) {
            toast.error('Por favor, selecione uma data e horário');
            return;
        }

        // TODO: Implement actual scheduling logic
        toast.success('Consulta agendada com sucesso!');
        navigate('/area-cliente/consultas');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <img
                    src={mockDoctor.avatar}
                    alt={mockDoctor.name}
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{mockDoctor.name}</h2>
                    <p className="text-gray-600">{mockDoctor.specialty}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Selecione a data da consulta</h3>
                <input
                    type="date"
                    min={minDate}
                    max={maxDateStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {selectedDate && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Horários disponíveis</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {mockTimeSlots.map((slot) => (
                            <button
                                key={slot.id}
                                onClick={() => setSelectedTimeSlot(slot.id)}
                                disabled={!slot.available}
                                className={`
                                    px-4 py-2 rounded-lg text-center transition-colors
                                    ${!slot.available
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : selectedTimeSlot === slot.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-500'
                                    }
                                `}
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSchedule}
                    disabled={!selectedDate || !selectedTimeSlot}
                    className={`
                        px-6 py-2 rounded-lg transition-colors
                        ${!selectedDate || !selectedTimeSlot
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }
                    `}
                >
                    Agendar Consulta
                </button>
            </div>
        </div>
    );
} 