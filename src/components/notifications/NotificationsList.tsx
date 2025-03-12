import { FiBell, FiClock, FiCheck } from 'react-icons/fi'

export const NotificationsList = () => {
    return (
        <>
            <div className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-100">
                <FiBell className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Exames Pendentes</p>
                    <p className="text-sm text-gray-500">3 pacientes com exames para revisar</p>
                    <p className="text-xs text-gray-400 mt-1">Há 2 horas</p>
                </div>
            </div>
            <div className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-100">
                <FiClock className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Próxima Consulta</p>
                    <p className="text-sm text-gray-500">Em 30 minutos - Maria Silva</p>
                    <p className="text-xs text-gray-400 mt-1">Há 30 minutos</p>
                </div>
            </div>
            <div className="flex items-center p-4 hover:bg-gray-50">
                <FiCheck className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Resultados Disponíveis</p>
                    <p className="text-sm text-gray-500">2 novos resultados de exames</p>
                    <p className="text-xs text-gray-400 mt-1">Há 1 hora</p>
                </div>
            </div>
        </>
    )
} 