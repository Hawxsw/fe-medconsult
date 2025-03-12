import axios from 'axios';
import { CreatePatientDTO, Patient, PatientResponse } from '@/types/patient';

export const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export const patientService = {
    create: async (data: CreatePatientDTO): Promise<PatientResponse> => {
        const response = await api.post<PatientResponse>('/patients', data);
        return response.data;
    },
    
    getAll: async (): Promise<PatientResponse[]> => {
        const response = await api.get<PatientResponse[]>('/patients');
        return response.data;
    },
    
    getById: async (id: string): Promise<PatientResponse> => {
        const response = await api.get<PatientResponse>(`/patients/${id}`);
        return response.data;
    },
    
    update: async (id: string, data: Partial<Patient>): Promise<PatientResponse> => {
        const response = await api.put<PatientResponse>(`/patients/${id}`, data);
        return response.data;
    },
    
    delete: async (id: string): Promise<void> => {
        await api.delete(`/patients/${id}`);
    }
}; 