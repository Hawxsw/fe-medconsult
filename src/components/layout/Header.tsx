import { FiSearch, FiBell, FiMenu } from 'react-icons/fi'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { NotificationsList } from '../notifications/NotificationsList'
import { UserMenu } from './UserMenu'
import { UserStatus } from './UserStatus'
import { useLocation } from 'react-router-dom'

interface HeaderProps {
    isSidebarOpen: boolean
    setIsSidebarOpen: (value: boolean) => void
}

export const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) => {
    const user = JSON.parse(localStorage.getItem('@App:user') || '{}')
    const location = useLocation()

    const getSearchPlaceholder = () => {
        switch (location.pathname) {
            case '/agendamentos':
                return 'Buscar agendamentos...'
            case '/pacientes':
                return 'Buscar pacientes...'
            case '/prontuarios':
                return 'Buscar prontuários...'
            default:
                return 'Buscar...'
        }
    }

    return (
        <header className="bg-white shadow-sm fixed w-full z-10">
            <div className="flex items-center h-[60px] px-4">
                <div className="flex items-center min-w-[256px]">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hover:bg-gray-100"
                    >
                        <FiMenu className="h-6 w-6 text-gray-600" />
                    </Button>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="w-[500px] relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={getSearchPlaceholder()}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                                     focus:border-transparent bg-gray-50"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end min-w-[256px] space-x-4">
                    <div className="relative">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <FiBell className="h-6 w-6 text-gray-600" />
                                    <Badge
                                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                        variant="destructive"
                                    >
                                        3
                                    </Badge>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0">
                                <div className="p-4 border-b border-gray-100">
                                    <h3 className="font-medium">Notificações</h3>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    <NotificationsList />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <UserMenu user={user} />
                    <div className="flex items-center space-x-3 border-l pl-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">CRM {user.crm}</p>
                        </div>
                        <div className="relative flex items-center">
                            <div className="relative w-9 h-9">
                                <img
                                    className="w-full h-full rounded-full"
                                    src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
                                    alt=""
                                />
                                <div className="absolute -bottom-[1px] -right-[1px]">
                                    <div className="w-[12px] h-[12px] rounded-full flex items-center justify-center">
                                        <UserStatus className="w-[12px] h-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
} 