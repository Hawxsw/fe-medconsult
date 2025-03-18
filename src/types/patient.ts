export interface IPatient {
    id: string;
    firstName: string;
    lastName: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    created_at: Date;
    updated_at: Date;
    created_by_id: string | null;
    updated_by_id: string | null;
  }