import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const navigation = [
    { name: 'Médicos', href: '/area-cliente/medicos' },
    { name: 'Minhas Consultas', href: '/area-cliente/consultas' },
    { name: 'Meu Perfil', href: '/area-cliente/perfil' }
];

export function ClientLayout() {
    const location = useLocation();
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/" className="text-xl font-bold text-blue-600">
                                    MedClin
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`
                                            inline-flex items-center px-1 pt-1 border-b-2
                                            text-sm font-medium transition-colors
                                            ${location.pathname === item.href
                                                ? 'border-blue-500 text-gray-900'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            }
                                        `}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-600"
                                onClick={logout}
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>

                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                                    block pl-3 pr-4 py-2 border-l-4
                                    text-base font-medium transition-colors
                                    ${location.pathname === item.href
                                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
} 