import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { CreatePatientSchema, createPatientSchema, UpdatePatientSchema, updatePatientSchema, usePatient } from '@/hooks/usePatients';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export function PatientRegistration() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isNew = id === 'new';
    const patientSchema = isNew ? createPatientSchema : updatePatientSchema;
    type PatientSchema = z.infer<typeof patientSchema>;
    const [isLoading, setLoading] = useState<boolean>(false);
    const { getPatient, createPatient, updatePatient } = usePatient();

    const {
        handleSubmit,
        register,
        setValue,
      } = useForm<PatientSchema>({
        resolver: zodResolver(patientSchema),
        disabled: isLoading
      });



    const getData = useCallback(async () => {
        setLoading(true);
        try {
    
          if (id && !isNew) {
            const foundPatient = await getPatient(id);
            setValue('email', foundPatient.email);
            setValue('firstName', foundPatient.firstName);
            setValue('lastName', foundPatient.lastName);
            setValue('cpf', foundPatient.cpf);
            setValue('phone', foundPatient.phone);
            setValue('cep', foundPatient.cep);
            setValue('street', foundPatient.street);
            setValue('number', foundPatient.number);
            setValue('complement', foundPatient.complement);
            setValue('neighborhood', foundPatient.neighborhood);
            setValue('city', foundPatient.city);
            setValue('state', foundPatient.state);
            setValue('password', foundPatient.password);
            setValue('confirmPassword', foundPatient.password);
          }
        } finally {
          setLoading(false);
        }
      }, [getPatient, id, isNew, setValue]);
    
      useEffect(() => {
        getData();
      }, [getData]);

      const handleSubmitPatient = useCallback(
        async (data: PatientSchema) => {
          console.log('Form Data:', data);
          setLoading(true);
          try {
            if (isNew) {
              console.log('Creating new patient...');
              const createdPatient = await createPatient(data as CreatePatientSchema);
              console.log('Patient created:', createdPatient);
              toast.success('Usuário criado com sucesso!');
              return navigate(`/patients/${createdPatient.id}`);
            }
    
            if (id) {
              const { confirmPassword, password, ...updateData } = data;
              await updatePatient(id, updateData as UpdatePatientSchema);
              toast.success('Usuário atualizado com sucesso!');
              return getData();
            }
          } finally {
            setLoading(false);
          }
        },
        [createPatient, getData, id, isNew, navigate, updatePatient],
      );
   

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cadastro de Paciente</h1>
                        <p className="text-gray-600">Preencha seus dados para criar sua conta</p>
                    </div>
                    
                    <form onSubmit={handleSubmit(handleSubmitPatient)} className="space-y-8">
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
                                        {...register('firstName')}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                                    <input
                                        type="text"
                                        {...register('lastName')}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">CPF</label>
                                    <input
                                        type="text"
                                        {...register('cpf')}
                                        placeholder="123.456.789-00"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                                    <input
                                        type="text"
                                        {...register('phone')}
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
                                        {...register('email')}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Senha</label>
                                    <input
                                        type="password"
                                        {...register('password')}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                                    <input
                                        type="password"
                                        {...register('confirmPassword')}
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
                                        {...register('cep')}
                                        placeholder="12345-678"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Rua</label>
                                    <input
                                        type="text"
                                        {...register('street')}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Número</label>
                                    <input
                                        type="text"
                                        {...register('number')}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Complemento</label>
                                    <input
                                        type="text"
                                        {...register('complement')}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Bairro</label>
                                    <input
                                        type="text"
                                        {...register('neighborhood')}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Cidade</label>
                                    <input
                                        type="text"
                                        {...register('city')}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                                    <input
                                        type="text"
                                        {...register('state')}
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