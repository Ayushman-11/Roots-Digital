import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Map backend error messages to user-friendly messages
 */
const getErrorMessage = (error: string): string => {
    const errorLower = error.toLowerCase();
    
    if (errorLower.includes('already exists') || errorLower.includes('duplicate') || errorLower.includes('already registered')) {
        return 'An account with this email already exists. Please sign in instead.';
    }
    if (errorLower.includes('invalid email') || errorLower.includes('valid email')) {
        return 'Please enter a valid email address.';
    }
    if (errorLower.includes('password') && (errorLower.includes('short') || errorLower.includes('length') || errorLower.includes('characters'))) {
        return 'Password must be at least 6 characters long.';
    }
    if (errorLower.includes('required') || errorLower.includes('provide') || errorLower.includes('missing')) {
        return 'Please fill in all required fields.';
    }
    if (errorLower.includes('network') || errorLower.includes('fetch') || errorLower.includes('connection')) {
        return 'Unable to connect to server. Please check your internet connection.';
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

export const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { signup, isAuthenticated, error, clearError } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Clear errors on unmount
    useEffect(() => {
        return () => clearError();
    }, [clearError]);

    // Clear local error when user starts typing
    useEffect(() => {
        if (localError) {
            setLocalError('');
        }
    }, [name, email, password, confirmPassword]);

    // Password strength check
    const getPasswordStrength = (pass: string) => {
        if (pass.length === 0) return { strength: 0, label: '' };
        if (pass.length < 6) return { strength: 1, label: 'Too short' };
        if (pass.length < 8) return { strength: 2, label: 'Weak' };
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pass)) return { strength: 4, label: 'Strong' };
        return { strength: 3, label: 'Medium' };
    };

    const passwordStrength = getPasswordStrength(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        clearError();

        // Validation
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setLocalError('Please fill in all fields.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setLocalError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setLocalError('Password must be at least 6 characters.');
            return;
        }

        if (password !== confirmPassword) {
            setLocalError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);

        try {
            await signup(name, email, password);
            // Signup successful - redirect to login page with success message
            navigate('/login', { 
                replace: true, 
                state: { signupSuccess: true, email } 
            });
        } catch (err) {
            // Error is set in context, but also set local error for immediate display
            const message = err instanceof Error ? err.message : 'Signup failed';
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
                    <p className="text-dark-500 mt-2">Create your account to get started.</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
                    <h2 className="text-2xl font-bold text-dark-900 mb-6">Create Account</h2>

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
                        {/* Name */}
                        <div>
                            <label className="block text-dark-700 text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4
                                        text-dark-900 placeholder-dark-400
                                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                        transition-all duration-200"
                                    placeholder="John Doe"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

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
                            <label className="block text-dark-700 text-sm font-medium mb-2">
                                Password
                            </label>
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
                            
                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="mt-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-colors ${
                                                    level <= passwordStrength.strength
                                                        ? passwordStrength.strength <= 2
                                                            ? 'bg-red-500'
                                                            : passwordStrength.strength === 3
                                                            ? 'bg-yellow-500'
                                                            : 'bg-green-500'
                                                        : 'bg-gray-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-xs mt-1 ${
                                        passwordStrength.strength <= 2
                                            ? 'text-red-500'
                                            : passwordStrength.strength === 3
                                            ? 'text-yellow-600'
                                            : 'text-green-600'
                                    }`}>
                                        {passwordStrength.label}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-dark-700 text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-12
                                        text-dark-900 placeholder-dark-400
                                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                        transition-all duration-200"
                                    placeholder="••••••••"
                                    disabled={isSubmitting}
                                />
                                {confirmPassword && password === confirmPassword && (
                                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                                )}
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
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

                    {/* Login Link */}
                    <p className="text-center text-dark-600">
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                            Sign in
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
