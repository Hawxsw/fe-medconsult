import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { patientService } from '../services/api';
import { CreatePatientDTO, Patient, PatientResponse } from '@/types/patient';

export function usePatients() {
    const queryClient = useQueryClient();

    const { data: patients, isLoading, error } = useQuery<PatientResponse[]>({
        queryKey: ['patients'],
        queryFn: patientService.getAll
    });

    const createPatient = useMutation<PatientResponse, Error, CreatePatientDTO>({
        mutationFn: patientService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        }
    });

    const updatePatient = useMutation<
        PatientResponse,
        Error,
        { id: string; data: Partial<Patient> }
    >({
        mutationFn: ({ id, data }) => patientService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        }
    });

    const deletePatient = useMutation<void, Error, string>({
        mutationFn: patientService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        }
    });

    return {
        patients,
        isLoading,
        error,
        createPatient,
        updatePatient,
        deletePatient
    };
} 