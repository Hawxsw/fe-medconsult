import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { usePatients } from '@/hooks/usePatients';
import { useNavigate } from 'react-router-dom';
import { CreatePatientDTO } from '@/types/patient';
import { toast } from 'react-hot-toast';

export function PatientRegistration() {
    const navigate = useNavigate();
    const { createPatient } = usePatients();
    const [formData, setFormData] = useState<CreatePatientDTO>({
        firstName: '',
        lastName: '',
        cpf: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
    });

    const formatCPF = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 11) {
            return digits.replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, (_, g1, g2, g3, g4) =>
                g1 + (g2 ? '.' + g2 : '') + (g3 ? '.' + g3 : '') + (g4 ? '-' + g4 : '')
            );
        }
        return value;
    };

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 11) {
            return digits.replace(/(\d{2})(\d{1})?(\d{4})?(\d{4})?/, (_, g1, g2, g3, g4) =>
                g1 ? `(${g1}` + (g2 ? `) ${g2}` : '') + (g3 ? `${g3}` : '') + (g4 ? `-${g4}` : '') : ''
            );
        }
        return value;
    };

    const formatCEP = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 8) {
            return digits.replace(/(\d{5})(\d{3})?/, (_, g1, g2) =>
                g1 + (g2 ? '-' + g2 : '')
            );
        }
        return value;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Aplica formatação específica para cada campo
        switch (name) {
            case 'cpf':
                formattedValue = formatCPF(value);
                break;
            case 'phone':
                formattedValue = formatPhone(value);
                break;
            case 'cep':
                formattedValue = formatCEP(value);
                break;
            default:
                formattedValue = value;
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            throw new Error('As senhas não coincidem');
        }
        
        if (formData.password.length < 6) {
            throw new Error('A senha deve ter pelo menos 6 caracteres');
        }

        // Validação de CPF (exemplo básico)
        if (formData.cpf.replace(/\D/g, '').length !== 11) {
            throw new Error('CPF inválido');
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('E-mail inválido');
        }

        // Validação de telefone
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!phoneRegex.test(formData.phone)) {
            throw new Error('Telefone inválido. Use o formato (99) 99999-9999');
        }

        // Validação de CEP
        const cepRegex = /^\d{5}-\d{3}$/;
        if (!cepRegex.test(formData.cep)) {
            throw new Error('CEP inválido. Use o formato 12345-678');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            validateForm();
            
            await createPatient.mutateAsync(formData, {
                onSuccess: () => {
                    toast.success('Cadastro realizado com sucesso!');
                    navigate('/login');
                },
                onError: (error) => {
                    toast.error(error.message || 'Erro ao realizar cadastro');
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Erro ao realizar cadastro');
            }
            console.error('Erro no cadastro:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cadastro de Paciente</h1>
                        <p className="text-gray-600">Preencha seus dados para criar sua conta</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">1</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Informações Pessoais</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">CPF</label>
                                    <input
                                        type="text"
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        placeholder="123.456.789-00"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(99) 99999-9999"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">2</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Informações da Conta</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
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
                                    <label className="block text-sm font-medium text-gray-700">Senha</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">3</span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Endereço</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">CEP</label>
                                    <input
                                        type="text"
                                        name="cep"
                                        value={formData.cep}
                                        onChange={handleChange}
                                        placeholder="12345-678"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Rua</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Número</label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Complemento</label>
                                    <input
                                        type="text"
                                        name="complement"
                                        value={formData.complement}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Bairro</label>
                                    <input
                                        type="text"
                                        name="neighborhood"
                                        value={formData.neighborhood}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Cidade</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="SP"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-150 ease-in-out hover:scale-105"
                            >
                                Criar Conta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
} 