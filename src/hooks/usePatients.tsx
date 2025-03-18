import React, { useCallback, useContext } from 'react';
import { useApi, IPaginationResponse } from '../services/api';
import { IGetPatientsProps } from '../services/api/user.service';
import { IPatient } from '../types/patient';
import { z } from 'zod';


interface IPatientProviderProps {
  children: React.ReactNode;
}

interface IPatientContextProps {
  getPatients: (props: IGetPatientsProps) => Promise<IPaginationResponse<IPatient[]>>;
  getPatient: (id: string) => Promise<IPatient>;
  createPatient: (data: CreatePatientSchema) => Promise<IPatient>;
  updatePatient: (id: string, data: UpdatePatientSchema) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
}

export const createPatientSchema = z
  .object({
    firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
    phone: z
      .string()
      .regex(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 dígitos'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
    .string({
      required_error: 'A confirmação da senha é obrigatória.',
    })
    .min(8, {
      message: 'A confirmação da senha deve ter pelo menos 8 caracteres.',
    }),
    cep: z.string().regex(/^\d{8}$/, 'CEP deve conter 8 dígitos numéricos'),
    street: z.string().min(3, 'Rua deve ter pelo menos 3 caracteres'),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
    city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não são iguais',
    path: ['confirmPassword'],
  });
export type CreatePatientSchema = z.infer<typeof createPatientSchema>;

export const updatePatientSchema = z
  .object({
    firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
    phone: z
      .string()
      .regex(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 dígitos'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
    .string({
      required_error: 'A confirmação da senha é obrigatória.',
    })
    .min(8, {
      message: 'A confirmação da senha deve ter pelo menos 8 caracteres.',
    }),
    cep: z.string().regex(/^\d{8}$/, 'CEP deve conter 8 dígitos numéricos'),
    street: z.string().min(3, 'Rua deve ter pelo menos 3 caracteres'),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
    city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  })  
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não são iguais',
    path: ['confirmPassword'],
  });

export type UpdatePatientSchema = z.infer<typeof updatePatientSchema>;

const PatientContext = React.createContext<IPatientContextProps | null>(null);

export const PatientProvider = ({ children }: IPatientProviderProps) => {
  const api = useApi();

  const getPatients = useCallback(
    async (props: IGetPatientsProps) => {
      const { data } = await api.patient.getPatients({
        page: props.page,
        pageSize: props.pageSize,
        q: props.q,
      });

      return data;
    },
    [api.patient],
  );

  const getPatient = useCallback(
    async (id: string) => {
      const { data } = await api.patient.getPatient(id);

      return data;
    },
    [api.patient],
  );

  const createPatient = useCallback(
    async (payload: CreatePatientSchema) => {
      const { data } = await api.patient.createPatient(payload);

      return data;
    },
    [api.patient],
  );

  const updatePatient = useCallback(
    async (id: string, data: UpdatePatientSchema) => {
      await api.patient.updatePatient(id, data);
    },
    [api.patient],
  );

  const deletePatient = useCallback(
    async (id: string) => {
      await api.patient.deletePatient(id);
    },
    [api.patient],
  );

  return (
    <PatientContext.Provider
      value={{ getPatients, getPatient, createPatient, updatePatient, deletePatient }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const ctx = useContext(PatientContext);
  if (ctx == null) {
    throw new Error('usePatient() called outside of a PatientProvider?');
  }
  return ctx;
};