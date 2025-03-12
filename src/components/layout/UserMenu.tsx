import { FiUser, FiSettings, FiHelpCircle, FiLogOut } from 'react-icons/fi'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface UserMenuProps {
    user: {
        name: string;
        crm?: string;
    }
}

export const UserMenu = ({ user }: UserMenuProps) => {
    const handleLogout = () => {
        localStorage.removeItem('@App:user')
        window.location.href = '/'
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <FiSettings className="h-6 w-6 text-gray-600" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
                <div className="p-2">
                    <div className="p-4 border-b">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">CRM {user.crm}</p>
                    </div>

                    <div className="p-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-2 py-1.5 text-sm"
                            onClick={() => window.location.href = '/perfil'}
                        >
                            <FiUser className="mr-2 h-4 w-4" />
                            Meu Perfil
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full justify-start px-2 py-1.5 text-sm"
                            onClick={() => window.location.href = '/configuracoes'}
                        >
                            <FiSettings className="mr-2 h-4 w-4" />
                            Configurações
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full justify-start px-2 py-1.5 text-sm"
                            onClick={() => window.location.href = '/ajuda'}
                        >
                            <FiHelpCircle className="mr-2 h-4 w-4" />
                            Ajuda e Suporte
                        </Button>
                    </div>

                    <div className="border-t p-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-2 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={handleLogout}
                        >
                            <FiLogOut className="mr-2 h-4 w-4" />
                            Sair
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
} 