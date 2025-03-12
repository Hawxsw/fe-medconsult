import { FiBell, FiClock, FiCheck } from 'react-icons/fi'
import { AnimatedList } from '@/components/magicui/animated-list'

const Dashboard = () => {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Consultas do Mês</h3>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">128</p>
                    <span className="text-green-500 text-sm">+12% em relação ao mês anterior</span>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Pacientes Ativos</h3>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">847</p>
                    <span className="text-green-500 text-sm">+5% em relação ao mês anterior</span>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Taxa de Retorno</h3>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">76%</p>
                    <span className="text-green-500 text-sm">+2% em relação ao mês anterior</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">Próximos Atendimentos</h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src="https://ui-avatars.com/api/?name=João+Silva&background=0D8ABC&color=fff"
                                        alt=""
                                    />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">João Silva</p>
                                        <p className="text-sm text-gray-500">Consulta de Rotina</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">14:30</p>
                                    <p className="text-sm text-gray-500">Hoje</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">Notificações</h2>
                        <div className="mt-6">
                            <AnimatedList delay={300}>
                                <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                                    <FiBell className="h-5 w-5 text-yellow-400" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">Exames Pendentes</p>
                                        <p className="text-sm text-gray-500">3 pacientes com exames para revisar</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                                    <FiClock className="h-5 w-5 text-blue-400" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">Próxima Consulta</p>
                                        <p className="text-sm text-gray-500">Em 30 minutos - Maria Silva</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                                    <FiCheck className="h-5 w-5 text-green-400" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">Resultados Disponíveis</p>
                                        <p className="text-sm text-gray-500">2 novos resultados de exames</p>
                                    </div>
                                </div>
                            </AnimatedList>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard