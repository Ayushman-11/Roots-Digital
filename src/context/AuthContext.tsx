import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Types
interface AuthContextType {
    user: User | null;
    session: Session | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updatePassword: (newPassword: string) => Promise<void>;
    clearError: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Manages authentication state via Supabase Auth
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Initialise auth state and subscribe to changes
     */
    useEffect(() => {
        // Get the initial session
        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            setSession(initialSession);
            setUser(initialSession?.user ?? null);
            setIsLoading(false);
        });

        // Listen for auth state changes (login, logout, token refresh, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setSession(newSession);
                setUser(newSession?.user ?? null);
                setIsLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    /**
     * Login with email + password
     */
    const login = useCallback(async (email: string, password: string): Promise<void> => {
        setError(null);

        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

        if (authError) {
            setError(authError.message);
            throw authError;
        }
    }, []);

    /**
     * Sign up with email + password.  Name is stored in user_metadata.
     */
    const signup = useCallback(async (name: string, email: string, password: string): Promise<void> => {
        setError(null);

        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },          // stored in user_metadata
            },
        });

        if (authError) {
            setError(authError.message);
            throw authError;
        }
    }, []);

    /**
     * Logout
     */
    const logout = useCallback(async (): Promise<void> => {
        setError(null);
        const { error: authError } = await supabase.auth.signOut();
        if (authError) {
            setError(authError.message);
            throw authError;
        }
    }, []);

    /**
     * Send password-reset email
     */
    const resetPassword = useCallback(async (email: string): Promise<void> => {
        setError(null);

        const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (authError) {
            setError(authError.message);
            throw authError;
        }
    }, []);

    /**
     * Update user password (called on /reset-password page after email link)
     */
    const updatePassword = useCallback(async (newPassword: string): Promise<void> => {
        setError(null);

        const { error: authError } = await supabase.auth.updateUser({ password: newPassword });

        if (authError) {
            setError(authError.message);
            throw authError;
        }
    }, []);

    /**
     * Clear error
     */
    const clearError = useCallback((): void => {
        setError(null);
    }, []);

    const value: AuthContextType = {
        user,
        session,
        isAuthenticated: !!session,
        isLoading,
        error,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
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
