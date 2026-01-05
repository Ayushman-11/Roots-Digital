import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Map backend error messages to user-friendly messages
 */
const getErrorMessage = (error: string): string => {
    const errorLower = error.toLowerCase();

    if (errorLower.includes('invalid') && (errorLower.includes('email') || errorLower.includes('password') || errorLower.includes('credentials'))) {
        return 'Invalid email or password. Please check your credentials and try again.';
    }
    if (errorLower.includes('not found') || errorLower.includes('no user')) {
        return 'No account found with this email. Please sign up first.';
    }
    if (errorLower.includes('required') || errorLower.includes('provide')) {
        return 'Please fill in all required fields.';
    }
    if (errorLower.includes('network') || errorLower.includes('fetch') || errorLower.includes('connection')) {
        return 'Unable to connect to server. Please check your internet connection.';
    }
    if (errorLower.includes('unauthorized') || errorLower.includes('401')) {
        return 'Session expired. Please log in again.';
    }
    if (errorLower.includes('too many') || errorLower.includes('rate limit')) {
        return 'Too many attempts. Please wait a moment and try again.';
    }

    // If it's a short, clean message from backend, show it
    if (error.length < 100 && !errorLower.includes('error')) {
        return error;
    }

    return 'Something went wrong. Please try again.';
};

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { login, isAuthenticated, error, clearError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if coming from signup success
    useEffect(() => {
        const state = location.state as { signupSuccess?: boolean; email?: string } | null;
        if (state?.signupSuccess) {
            setShowSuccessMessage(true);
            if (state.email) {
                setEmail(state.email);
            }
            // Clear the state so message doesn't show on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Redirect if already authenticated - go to home page
    useEffect(() => {
        if (isAuthenticated) {
            // If user was trying to access a protected route, go there; otherwise go home
            const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
            navigate(from || '/', { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    // Clear errors on unmount
    useEffect(() => {
        return () => clearError();
    }, [clearError]);

    // Clear local error when user starts typing
    useEffect(() => {
        if (localError) {
            setLocalError('');
        }
        // Also clear success message when user starts typing
        if (showSuccessMessage) {
            setShowSuccessMessage(false);
        }
    }, [email, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        clearError();

        // Validation
        if (!email.trim() || !password.trim()) {
            setLocalError('Please fill in all fields.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setLocalError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        try {
            await login(email, password);
            // Navigation happens via useEffect when isAuthenticated changes
        } catch (err) {
            // Error is set in context, but also set local error for immediate display
            const message = err instanceof Error ? err.message : 'Login failed';
            setLocalError(getErrorMessage(message));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get user-friendly error message
    const displayError = localError || (error ? getErrorMessage(error) : '');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <h1 className="text-3xl font-bold text-dark-900">
                            Digi<span className="text-primary-600">Roots</span>
                        </h1>
                    </Link>
                    <p className="text-dark-500 mt-2">Welcome back! Sign in to continue.</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
                    <h2 className="text-2xl font-bold text-dark-900 mb-6">Sign In</h2>

                    {/* Success Message from Signup */}
                    {showSuccessMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                        >
                            <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                            <p className="text-green-700 text-sm">Account created successfully! Please sign in.</p>
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {displayError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                        >
                            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                            <p className="text-red-600 text-sm">{displayError}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-dark-700 text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4
                                        text-dark-900 placeholder-dark-400
                                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                        transition-all duration-200"
                                    placeholder="you@example.com"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-dark-700 text-sm font-medium">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-12
                                        text-dark-900 placeholder-dark-400
                                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                        transition-all duration-200"
                                    placeholder="••••••••"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-semibold 
                                py-3.5 px-6 rounded-xl
                                flex items-center justify-center gap-2
                                transition-all duration-300
                                disabled:opacity-50 disabled:cursor-not-allowed
                                hover:shadow-lg hover:shadow-primary-500/25"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-dark-400 text-sm">or</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Signup Link */}
                    <p className="text-center text-dark-600">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                            Create account
                        </Link>
                    </p>
                </div>

                {/* Back to home */}
                <p className="text-center mt-6">
                    <Link
                        to="/"
                        className="text-dark-500 hover:text-dark-700 text-sm transition-colors"
                    >
                        ← Back to home
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};
