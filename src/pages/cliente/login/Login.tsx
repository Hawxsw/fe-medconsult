import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

interface LoginFormData {
    email: string;
    password: string;
    userType: 'patient' | 'doctor';
}

export function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        userType: 'patient'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('E-mail inválido');
        }

        if (formData.password.length < 6) {
            throw new Error('Senha deve ter pelo menos 6 caracteres');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            validateForm();
            
            await login.mutateAsync(formData, {
                onSuccess: () => {
                    toast.success('Login realizado com sucesso!');
                    navigate('/dashboard');
                },
                onError: (error: any) => {
                    if (error.response?.data?.message) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error('Erro ao realizar login. Verifique suas credenciais.');
                    }
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Erro ao realizar login');
            }
            console.error('Erro no login:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h1>
                        <p className="text-gray-600">Faça login para acessar sua conta</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                                        <Link 
                                            to="/recuperar-senha"
                                            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            Esqueceu a senha?
                                        </Link>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                className="w-full px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-150 ease-in-out hover:scale-105"
                                disabled={login.isPending}
                            >
                                {login.isPending ? 'Entrando...' : 'Entrar'}
                            </button>

                            <p className="text-center text-gray-600">
                                Não tem uma conta?{' '}
                                <Link 
                                    to="/registration"
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                    Cadastre-se
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
} 