import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-gray-100">
            <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Sidebar isSidebarOpen={isSidebarOpen} />

            <main className={`pt-20 ${isSidebarOpen ? 'ml-64' : 'ml-20'} px-6 transition-all duration-300`}>
                <Outlet />
            </main>
        </div>
    )
} 