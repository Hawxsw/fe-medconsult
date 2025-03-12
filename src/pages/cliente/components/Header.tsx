import { Logo } from "@/components/Logo";
import { Link as ReactLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export function Header() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const NavigationLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
        if (isHomePage) {
            return (
                <ReactLink
                    to={to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className="text-gray-600 hover:text-blue-600 cursor-pointer"
                >
                    {children}
                </ReactLink>
            );
        }

        return (
            <RouterLink
                to={`/#${to}`}
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
            >
                {children}
            </RouterLink>
        );
    };

    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <RouterLink to="/">
                        <Logo className="h-16 w-auto" />
                    </RouterLink>

                    <nav className="hidden md:flex items-center gap-6">
                        <NavigationLink to="inicio">Início</NavigationLink>
                        <NavigationLink to="servicos">Serviços</NavigationLink>
                        <NavigationLink to="estatisticas">Estatísticas</NavigationLink>
                        <NavigationLink to="sobre">Sobre</NavigationLink>
                        <NavigationLink to="recursos">Recursos</NavigationLink>
                        <NavigationLink to="depoimentos">Depoimentos</NavigationLink>
                        <NavigationLink to="faq">FAQ</NavigationLink>
                    </nav>

                    <div className="flex items-center gap-4">
                        <RouterLink to="/area-medico" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Área do Médico
                        </RouterLink>
                        <div className="h-4 w-px bg-gray-200 mx-2"></div>
                        <RouterLink to="/login" className="text-gray-600 hover:text-blue-600">
                            Login
                        </RouterLink>
                        <RouterLink to="/registration" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Cadastre-se
                        </RouterLink>
                    </div>
                </div>
            </div>
        </header>
    );
} 