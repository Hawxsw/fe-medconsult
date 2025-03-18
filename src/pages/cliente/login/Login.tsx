import { useEffect, useState, useCallback } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { routes } from '@/routes/Router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const signInSchema = z.object({
    email: z
      .string({
        required_error: 'Você deve inserir um e-mail.',
      })
      .email({ message: 'Informe um e-mail válido.' }),
    password: z.string({
      required_error: 'Você deve inserir uma senha.',
    }),
  });

type SignInSchema = z.infer<typeof signInSchema>;


export function Login() {
    const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      navigate(routes.home.path);
    }
  }, [currentUser]);

  const {
    register,
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    disabled: isLoading,
  });

  const handleLogin = useCallback(async (data: SignInSchema) => {
    setLoading(true);
    try {
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      toast.error('Senha ou e-mail inválido');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h1>
                        <p className="text-gray-600">Faça login para acessar sua conta</p>
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                        <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                                    <input
                                        type="email"
                                        {...register('email')}
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
                                        {...register('password')}
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
                                disabled={isLoading}
                            >
                                {isLoading ? 'Entrando...' : 'Entrar'}
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