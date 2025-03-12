import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    isOnline: boolean;
    avatar: string;
    rating: number;
    nextAvailable: string;
}

const mockDoctors: Doctor[] = [
    {
        id: '1',
        name: 'Dr. João Silva',
        specialty: 'Cardiologista',
        isOnline: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
        rating: 4.8,
        nextAvailable: '14:30 - Hoje'
    },
    {
        id: '2',
        name: 'Dra. Maria Santos',
        specialty: 'Dermatologista',
        isOnline: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
        rating: 4.9,
        nextAvailable: '15:00 - Hoje'
    },
    {
        id: '3',
        name: 'Dr. Carlos Oliveira',
        specialty: 'Clínico Geral',
        isOnline: false,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
        rating: 4.7,
        nextAvailable: '09:00 - Amanhã'
    }
];

export function DoctorsList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    const specialties = [...new Set(mockDoctors.map(doctor => doctor.specialty))];

    const filteredDoctors = mockDoctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    const handleSchedule = (doctorId: string) => {
        navigate('/area-cliente/novo-agendamento', { state: { doctorId } });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Médicos Disponíveis</h1>
                <div className="flex gap-4">
                    <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Todas as especialidades</option>
                        {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Buscar médico..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src={doctor.avatar}
                                    alt={doctor.name}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                                    <p className="text-gray-600">{doctor.specialty}</p>
                                </div>
                            </div>
                            
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${doctor.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                                    <span className="text-sm text-gray-600">
                                        {doctor.isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-sm text-gray-600">{doctor.rating}</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Próximo horário: {doctor.nextAvailable}
                                </p>
                            </div>

                            <button
                                onClick={() => handleSchedule(doctor.id)}
                                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Agendar Consulta
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 