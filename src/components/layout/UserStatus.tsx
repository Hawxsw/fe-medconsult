import { useState } from 'react'
import { FiCheck, FiClock, FiMoon, FiMinus } from 'react-icons/fi'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type StatusType = 'online' | 'idle' | 'busy' | 'offline'

interface StatusOption {
    value: StatusType
    label: string
    icon: React.ReactNode
    color: string
    ringColor: string
    glow: string
}

const statusOptions: StatusOption[] = [
    {
        value: 'online',
        label: 'Online',
        icon: <FiCheck className="h-4 w-4" />,
        color: 'bg-[#24D154]',
        ringColor: 'ring-[#24D154]',
        glow: 'shadow-[0_0_8px_rgba(36,209,84,0.6)]'
    },
    {
        value: 'idle',
        label: 'Ausente',
        icon: <FiClock className="h-4 w-4" />,
        color: 'bg-[#FF9F1C]',
        ringColor: 'ring-[#FF9F1C]',
        glow: 'shadow-[0_0_8px_rgba(255,159,28,0.6)]'
    },
    {
        value: 'busy',
        label: 'Não perturbe',
        icon: <FiMinus className="h-4 w-4" />,
        color: 'bg-[#FF4B4B]',
        ringColor: 'ring-[#FF4B4B]',
        glow: 'shadow-[0_0_8px_rgba(255,75,75,0.6)]'
    },
    {
        value: 'offline',
        label: 'Invisível',
        icon: <FiMoon className="h-4 w-4" />,
        color: 'bg-[#8E9297]',
        ringColor: 'ring-[#8E9297]',
        glow: ''
    }
]

interface UserStatusProps {
    className?: string
}

export const UserStatus = ({ className }: UserStatusProps) => {
    const [status, setStatus] = useState<StatusType>(() => {
        return (localStorage.getItem('@App:userStatus') as StatusType) || 'online'
    })

    const handleStatusChange = (newStatus: StatusType) => {
        setStatus(newStatus)
        localStorage.setItem('@App:userStatus', newStatus)
    }

    const currentStatus = statusOptions.find(option => option.value === status)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className={`relative group ${className}`}>
                    <span
                        className={`block w-full h-full rounded-full 
                        ${currentStatus?.color}
                        ${currentStatus?.value !== 'offline' ? currentStatus?.glow : ''} 
                        transition-all duration-200`}
                    />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="end" sideOffset={5}>
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 mb-2">DEFINIR STATUS</p>
                    <div className="space-y-0.5">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                className={`w-full flex items-center px-3 py-2 rounded-md
                                    transition-all duration-200 
                                    ${status === option.value
                                        ? 'bg-gray-100/80 text-gray-900'
                                        : 'hover:bg-gray-50 text-gray-700'}`}
                                onClick={() => handleStatusChange(option.value)}
                            >
                                <span className={`h-2.5 w-2.5 rounded-full ${option.color} 
                                    ring-1 ring-white shadow-sm mr-3`}
                                />
                                <span className="flex-1 font-medium text-sm">
                                    {option.label}
                                </span>
                                {status === option.value && (
                                    <span className="text-gray-500">{option.icon}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}