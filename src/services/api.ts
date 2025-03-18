import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { AxiosInstance } from "axios";
import { AuthService } from "./api/auth.service";
import { PatientService } from "./api/user.service";
import { useMemo } from "react";

export interface IPaginationResponse<D> {
    count: number;
    page: number;
    data: D;
  }
  
  export class ApiService {
    public api: AxiosInstance;
  
    private API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
    constructor(logout?: () => Promise<void>) {
      console.log('Initializing API with base URL:', this.API_URL);
      
      const api = axios.create({
        baseURL: this.API_URL,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      api.interceptors.request.use(
        (config) => {
          console.log('API Request Details:', {
            url: `${config.baseURL}${config.url}`,
            method: config.method,
            headers: config.headers,
            data: config.data,
            baseURL: config.baseURL
          });
          return config;
        },
        (error) => {
          console.error('API Request Error:', {
            message: error.message,
            config: error.config,
            response: error.response
          });
          return Promise.reject(error);
        },
      );
  
      api.interceptors.response.use(
        (response) => {
          console.log('API Response:', {
            url: response.config.url,
            method: response.config.method,
            status: response.status,
            data: response.data
          });
          return response;
        },
        (error) => {
          console.error('API Response Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
          });
          if (error.response?.status === 401 && logout) {
            logout();
          }
          return Promise.reject(error);
        },
      );
  
      this.auth = new AuthService(api);
      this.patient = new PatientService(api);
  
      this.api = api;
    }
  
    readonly auth;
    readonly patient;
  }
  
  export const useApi = () => {
    const { logout } = useAuth();
  
    return useMemo(() => new ApiService(logout), [logout]);
  };