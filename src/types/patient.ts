export interface Address {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
}

export interface Patient {
    id?: string;
    name: string;
    email: string;
    document: string;
    birthDate: string;
    phone: string;
    password: string;
    address: Address;
}

export interface PatientResponse extends Omit<Patient, 'password'> {
    createdAt: string;
    updatedAt: string;
}

export interface CreatePatientDTO {
    firstName: string;
    lastName: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
} 