import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Map error messages to user-friendly messages
 */
const getErrorMessage = (error: string): string => {
    const errorLower = error.toLowerCase();

    if (errorLower.includes('required') || errorLower.includes('provide')) {
        return 'Please enter your email address.';
    }
    if (errorLower.includes('network') || errorLower.includes('fetch') || errorLower.includes('connection')) {
        return 'Unable to connect to server. Please check your internet connection.';
    }
    if (errorLower.includes('too many') || errorLower.includes('rate limit')) {
        return 'Too many attempts. Please wait a moment and try again.';
    }
    if (errorLower.includes('email') && errorLower.includes('sent')) {
        return error; // Already a good message
    }

    // If it's a short, clean message from backend, show it
    if (error.length < 100 && !errorLower.includes('error')) {
        return error;
    }

    return 'Something went wrong. Please try again.';
};

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const { resetPassword } = useAuth();

    // Clear error when user starts typing
    useEffect(() => {
        if (error) {
            setError('');
        }
    }, [email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);

        try {
            await resetPassword(email);
            setIsSuccess(true);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Request failed';
            setError(getErrorMessage(message));
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <p className="text-dark-500 mt-2">
                        {isSuccess ? 'Check your email' : 'Reset your password'}
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xl">
                    {isSuccess ? (
                        /* Success State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="text-green-600" size={32} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-dark-900 mb-3">
                                Check Your Email
                            </h2>
                            <p className="text-dark-500 mb-6 text-sm sm:text-base">
                                If an account exists with <span className="font-medium text-dark-700">{email}</span>,
                                we've sent a password reset link. Please check your inbox and spam folder.
                            </p>
                            <p className="text-dark-400 text-xs sm:text-sm mb-6">
                                The link will expire in 15 minutes.
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 px-6
                                    bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl
                                    transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                Back to Sign In
                            </Link>
                        </motion.div>
                    ) : (
                        /* Form State */
                        <>
                            <h2 className="text-xl sm:text-2xl font-bold text-dark-900 mb-2">
                                Forgot Password?
                            </h2>
                            <p className="text-dark-500 mb-6 text-sm sm:text-base">
                                No worries! Enter your email and we'll send you a reset link.
                            </p>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                                >
                                    <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                                    <p className="text-red-600 text-sm">{error}</p>
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
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 sm:py-3.5 pl-12 pr-4
                                                text-dark-900 placeholder-dark-400 text-sm sm:text-base
                                                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                                transition-all duration-200"
                                            placeholder="you@example.com"
                                            disabled={isSubmitting}
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 sm:py-3.5 px-6 bg-primary-600 hover:bg-primary-700 
                                        disabled:bg-primary-400 disabled:cursor-not-allowed
                                        text-white font-semibold rounded-xl
                                        transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100
                                        flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>Send Reset Link</span>
                                    )}
                                </button>
                            </form>

                            {/* Back to Login */}
                            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 
                                        font-medium transition-colors text-sm sm:text-base"
                                >
                                    <ArrowLeft size={18} />
                                    Back to Sign In
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-dark-400 text-xs sm:text-sm mt-8">
                    Remember your password?{' '}
                    <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};
