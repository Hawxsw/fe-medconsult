import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface LoginCredentials {
    email: string;
    password: string;
    userType: 'patient' | 'doctor';
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export function useAuth() {
    const navigate = useNavigate();

    const login = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const endpoint = credentials.userType === 'patient' ? '/patients/sessions' : '/doctors/sessions';
            const response = await api.post<AuthResponse>(endpoint, credentials);
            return {
                ...response.data,
                user: {
                    ...response.data.user,
                    type: credentials.userType
                }
            };
        },
        onSuccess: (data) => {
            localStorage.setItem('@MedClin:token', data.token);
            localStorage.setItem('@MedClin:user', JSON.stringify(data.user));
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            
            if (data.user.type === 'patient') {
                navigate('/area-cliente/medicos');
            } else {
                navigate('/dashboard');
            }
        }
    });

    const logout = () => {
        localStorage.removeItem('@MedClin:token');
        localStorage.removeItem('@MedClin:user');
        delete api.defaults.headers.common['Authorization'];
        navigate('/');
    };

    const getUser = () => {
        const userStr = localStorage.getItem('@MedClin:user');
        if (!userStr) return null;
        return JSON.parse(userStr);
    };

    return {
        login,
        logout,
        getUser,
        isAuthenticated: !!localStorage.getItem('@MedClin:token')
    };
} 