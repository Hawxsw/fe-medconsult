import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import Agendamentos from '@/pages/Agendamentos'
import { Pacientes } from "@/pages/Pacientes"
import { Prontuarios } from "@/pages/Prontuarios"
import { Relatorios } from "@/pages/Relatorios"
import { Configuracoes } from "@/pages/Configuracoes"
import { Chat } from "@/pages/Chat"
import { LandingPage } from "@/pages/cliente/LandingPage"
import { PatientRegistration } from '@/pages/cliente/registration/PatientRegistration'
import { Login } from '@/pages/cliente/login/Login'
import { ClientLayout } from '@/pages/cliente/components/ClientLayout'
import { DoctorsList } from '@/pages/cliente/doctors/DoctorsList'
import { MyAppointments } from '@/pages/cliente/appointments/MyAppointments'
import { NewAppointment } from '@/pages/cliente/appointments/NewAppointment'
import { Profile } from '@/pages/cliente/profile/Profile'
import SignIn from '@/pages/signin'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/registration',
        element: <PatientRegistration />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/area-medico',
        element: <SignIn />
    },
    {
        path: '/area-cliente',
        element: (
                <ClientLayout />
        ),
        children: [
            {
                path: 'medicos',
                element: <DoctorsList />
            },
            {
                path: 'medicos/:doctorId/agendar',
                element: <NewAppointment />
            },
            {
                path: 'consultas',
                element: <MyAppointments />
            },
            {
                path: 'perfil',
                element: <Profile />
            }
        ]
    },
    {
        path: '/dashboard',
        element: (
                <Layout />
        ),
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'agendamentos',
                element: <Agendamentos />
            },
            {
                path: 'pacientes',
                element: <Pacientes />
            },
            {
                path: 'prontuarios',
                element: <Prontuarios />
            },
            {
                path: 'relatorios',
                element: <Relatorios />
            },
            {
                path: 'chat',
                element: <Chat />
            },
            {
                path: 'configuracoes',
                element: <Configuracoes />
            }
        ]
    }
]) 