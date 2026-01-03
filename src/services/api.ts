/**
 * API Service
 * Handles all authentication API calls
 */

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: User;
}

export interface ApiError {
    success: false;
    message: string;
}

/**
 * Get stored auth token from localStorage
 */
export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

/**
 * Set auth token in localStorage
 */
export const setToken = (token: string): void => {
    localStorage.setItem('token', token);
};

/**
 * Remove auth token from localStorage
 */
export const removeToken = (): void => {
    localStorage.removeItem('token');
};

/**
 * Make API request with optional auth header
 */
const apiRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const token = getToken();
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

/**
 * Signup API call
 */
export const signupApi = async (
    name: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
    });
};

/**
 * Login API call
 */
export const loginApi = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};

/**
 * Get current user API call
 */
export const getMeApi = async (): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/me', {
        method: 'GET',
    });
};

/**
 * Forgot password API call
 */
export const forgotPasswordApi = async (
    email: string
): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
};

/**
 * Reset password API call
 */
export const resetPasswordApi = async (
    token: string,
    password: string
): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>(`/auth/reset-password/${token}`, {
        method: 'POST',
        body: JSON.stringify({ password }),
    });
};
