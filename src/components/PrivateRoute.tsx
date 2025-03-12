import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PrivateRouteProps {
    children: React.ReactNode;
    allowedUserType?: 'patient' | 'doctor';
}

export function PrivateRoute({ children, allowedUserType }: PrivateRouteProps) {
    const { isAuthenticated, getUser } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const user = getUser();
    if (allowedUserType && user?.type !== allowedUserType) {
        // Redireciona para a área apropriada do usuário
        const redirectPath = user?.type === 'patient' ? '/area-cliente/medicos' : '/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
} 