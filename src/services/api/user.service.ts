import { AxiosInstance } from 'axios';
import { IPatient } from '../../types/patient';
import { IPaginationResponse } from '../api';
import { CreatePatientSchema, UpdatePatientSchema } from '../../hooks/usePatients';

export interface IGetPatientsProps {
  pageSize: number;
  page: number;
  q?: string;
}

export class PatientService {
  constructor(private api: AxiosInstance) {}

  public getPatients(params: IGetPatientsProps) {
    console.log('GET /patients', params);
    return this.api.get<IPaginationResponse<IPatient[]>>('/patients', {
      params: params,
    });
  }

  public getPatient(id: string) {
    console.log('GET /patients/:id', id);
    return this.api.get<IPatient>(`/patients/${id}`);
  }

  public createPatient(patient: CreatePatientSchema) {
    console.log('Creating patient with data:', {
      url: '/patients',
      method: 'POST',
      data: patient
    });
    return this.api.post<IPatient>('/patients', patient);
  }

  public updatePatient(id: string, patient: UpdatePatientSchema) {
    console.log('Updating patient:', {
      url: `/patients/${id}`,
      method: 'PUT',
      data: patient
    });
    return this.api.put<IPatient>(`/patients/${id}`, patient);
  }

  public deletePatient(id: string) {
    console.log('DELETE /patients/:id', id);
    return this.api.delete(`/patients/${id}`);
  }
}