import { Logo } from "@/components/Logo";
import { Link as ReactLink } from 'react-scroll';

export function Header() {
    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <Logo className="h-16 w-auto" />
                    
                    <nav className="hidden md:flex items-center gap-6">
                        <ReactLink 
                            to="inicio"
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            className="text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                            Início
                        </ReactLink>
                        <ReactLink 
                            to="servicos"
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            className="text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                            Serviços
                        </ReactLink>
                        <ReactLink 
                            to="estatisticas"
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            className="text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                            Estatísticas
                        </ReactLink>
                        <ReactLink 
                            to="sobre"
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            className="text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                            Sobre
                        </ReactLink>
                        <ReactLink 
                            to="recursos"
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            className="text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                            Recursos
                        </ReactLink>
                        <ReactLink 
                            to="depoimentos"
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            className="text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                            Depoimentos
                        </ReactLink>
                        <ReactLink 
                            to="faq"
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            className="text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                            FAQ
                        </ReactLink>
                    </nav>

                    <div className="flex items-center gap-4">
                        <a href="/area-medico" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Área do Médico
                        </a>
                        <div className="h-4 w-px bg-gray-200 mx-2"></div>
                        <a href="/login" className="text-gray-600 hover:text-blue-600">
                            Login
                        </a>
                        <a href="/registration" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Cadastre-se
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
} 