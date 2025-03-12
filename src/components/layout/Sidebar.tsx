import {
    FaUserMd,
    FaCalendarAlt,
    FaUsers,
    FaFileAlt,
    FaChartBar,
    FaCog,
    FaComments
} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
    isSidebarOpen: boolean
}

export const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
    const [animationClass, setAnimationClass] = useState('')

    useEffect(() => {
        if (isSidebarOpen) {
            setAnimationClass('animate__animated animate__slideInLeft animate__faster')
        } else {
            setAnimationClass('animate__animated animate__slideOutLeft animate__faster')
        }
    }, [isSidebarOpen])

    if (!isSidebarOpen) return null;

    return (
        <aside
            className={`fixed left-0 top-[3.75rem] h-[calc(100vh-3.75rem)] w-64 bg-white border-r 
            shadow-sm transition-all duration-300 ${animationClass}`}
        >
            <nav className="mt-8 px-4">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-md ${isActive
                                    ? 'text-blue-600 bg-blue-50 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            <FaUserMd className="h-5 w-5" />
                            {isSidebarOpen && <span className="ml-3">Dashboard</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/agendamentos"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-md ${isActive
                                    ? 'text-blue-600 bg-blue-50 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            <FaCalendarAlt className="h-5 w-5" />
                            {isSidebarOpen && <span className="ml-3">Agendamentos</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pacientes"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-md ${isActive
                                    ? 'text-blue-600 bg-blue-50 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            <FaUsers className="h-5 w-5" />
                            {isSidebarOpen && <span className="ml-3">Pacientes</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/prontuarios"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-md ${isActive
                                    ? 'text-blue-600 bg-blue-50 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            <FaFileAlt className="h-5 w-5" />
                            {isSidebarOpen && <span className="ml-3">Prontuários</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/relatorios"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-md ${isActive
                                    ? 'text-blue-600 bg-blue-50 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            <FaChartBar className="h-5 w-5" />
                            {isSidebarOpen && <span className="ml-3">Relatórios</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/chat"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-md ${isActive
                                    ? 'text-blue-600 bg-blue-50 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            <FaComments className="h-5 w-5" />
                            {isSidebarOpen && <span className="ml-3">Chat</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/configuracoes"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-md ${isActive
                                    ? 'text-blue-600 bg-blue-50 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            <FaCog className="h-5 w-5" />
                            {isSidebarOpen && <span className="ml-3">Configurações</span>}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
} 