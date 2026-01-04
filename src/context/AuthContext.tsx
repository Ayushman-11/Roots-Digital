import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '../services/api';
import { 
    loginApi, 
    signupApi, 
    getMeApi, 
    getToken, 
    setToken, 
    removeToken 
} from '../services/api';

// Types
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Manages authentication state and provides auth functions
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Load user from stored token on app initialization
     */
    const loadUser = useCallback(async () => {
        const token = getToken();
        
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await getMeApi();
            if (response.success && response.user) {
                setUser(response.user);
            } else {
                // Invalid token, clean up
                removeToken();
            }
        } catch (err) {
            // Token expired or invalid
            console.error('Failed to load user:', err);
            removeToken();
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load user on mount
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    /**
     * Login function
     */
    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await loginApi(email, password);
            
            if (response.success && response.token && response.user) {
                setToken(response.token);
                setUser(response.user);
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Signup function - only creates account, does not auto-login
     */
    const signup = async (name: string, email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const signupResponse = await signupApi(name, email, password);
            
            if (!signupResponse.success) {
                throw new Error(signupResponse.message || 'Signup failed');
            }
            // Success - user will be redirected to login page
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Signup failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Logout function
     */
    const logout = (): void => {
        removeToken();
        setUser(null);
        setError(null);
    };

    /**
     * Clear error
     */
    const clearError = (): void => {
        setError(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        signup,
        logout,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to use auth context
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
};
