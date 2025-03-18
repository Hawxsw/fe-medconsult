import { AxiosInstance } from 'axios';
import { IPatient } from '../../types/patient';

export class AuthService {
  constructor(private api: AxiosInstance) {}

  public signIn(email: string, password: string) {
    console.log('Attempting login with:', { email, password });
    return this.api.post<{ token: string; patient: IPatient }>(
      '/patients/login',
      { email, password }
    ).then(response => {
      console.log('Login successful:', response.data);
      // Store the token
      this.setToken(response.data.token);
      return response.data;
    }).catch(error => {
      console.error('Login error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    });
  }

  public getMe() {
    return this.api.get<IPatient>('/patients/me');
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  public clearToken(): void {
    localStorage.removeItem('authToken');
  }
}