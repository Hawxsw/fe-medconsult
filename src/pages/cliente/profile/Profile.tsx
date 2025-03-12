import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ProfileData {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    address: {
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        state: string;
        cep: string;
    };
}

// Mock data
const mockProfile: ProfileData = {
    name: 'João da Silva',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    address: {
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        neighborhood: 'Jardim das Rosas',
        city: 'São Paulo',
        state: 'SP',
        cep: '01234-567'
    }
};

export function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<ProfileData>(mockProfile);
    const [tempProfile, setTempProfile] = useState<ProfileData>(mockProfile);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setTempProfile(prev => {
                if (parent === 'address') {
                    return {
                        ...prev,
                        address: {
                            ...prev.address,
                            [child]: value
                        }
                    };
                }
                return prev;
            });
        } else {
            setTempProfile(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSave = () => {
        // TODO: Implement API call to update profile
        setProfile(tempProfile);
        setIsEditing(false);
        toast.success('Perfil atualizado com sucesso!');
    };

    const handleCancel = () => {
        setTempProfile(profile);
        setIsEditing(false);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        Editar Perfil
                    </button>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={isEditing ? tempProfile.name : profile.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={isEditing ? tempProfile.email : profile.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">CPF</label>
                        <input
                            type="text"
                            name="cpf"
                            value={isEditing ? tempProfile.cpf : profile.cpf}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input
                            type="text"
                            name="phone"
                            value={isEditing ? tempProfile.phone : profile.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 pt-4">Endereço</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">CEP</label>
                        <input
                            type="text"
                            name="address.cep"
                            value={isEditing ? tempProfile.address.cep : profile.address.cep}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Rua</label>
                        <input
                            type="text"
                            name="address.street"
                            value={isEditing ? tempProfile.address.street : profile.address.street}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Número</label>
                        <input
                            type="text"
                            name="address.number"
                            value={isEditing ? tempProfile.address.number : profile.address.number}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Complemento</label>
                        <input
                            type="text"
                            name="address.complement"
                            value={isEditing ? tempProfile.address.complement : profile.address.complement}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Bairro</label>
                        <input
                            type="text"
                            name="address.neighborhood"
                            value={isEditing ? tempProfile.address.neighborhood : profile.address.neighborhood}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Cidade</label>
                        <input
                            type="text"
                            name="address.city"
                            value={isEditing ? tempProfile.address.city : profile.address.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Estado</label>
                        <input
                            type="text"
                            name="address.state"
                            value={isEditing ? tempProfile.address.state : profile.address.state}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors"
                        >
                            Salvar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 