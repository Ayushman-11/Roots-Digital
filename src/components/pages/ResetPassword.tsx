import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Map error messages to user-friendly messages
 */
const getErrorMessage = (error: string): string => {
    const errorLower = error.toLowerCase();

    if (errorLower.includes('invalid') || errorLower.includes('expired')) {
        return 'This reset link is invalid or has expired. Please request a new password reset.';
    }
    if (errorLower.includes('password') && (errorLower.includes('6') || errorLower.includes('characters') || errorLower.includes('length'))) {
        return 'Password must be at least 6 characters long.';
    }
    if (errorLower.includes('required') || errorLower.includes('provide')) {
        return 'Please enter a new password.';
    }
    if (errorLower.includes('network') || errorLower.includes('fetch') || errorLower.includes('connection')) {
        return 'Unable to connect to server. Please check your internet connection.';
    }
    if (errorLower.includes('too many') || errorLower.includes('rate limit')) {
        return 'Too many attempts. Please wait a moment and try again.';
    }

    // If it's a short, clean message, show it
    if (error.length < 100 && !errorLower.includes('error')) {
        return error;
    }

    return 'Something went wrong. Please try again.';
};

export const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const { updatePassword, session } = useAuth();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [hasRecoverySession, setHasRecoverySession] = useState(false);

    // Supabase appends recovery tokens as URL hash params.
    // The onAuthStateChange listener in AuthContext picks up the PASSWORD_RECOVERY
    // event and establishes a session. We detect this here.
    useEffect(() => {
        if (session) {
            setHasRecoverySession(true);
        }
    }, [session]);

    // Clear error when user starts typing
    useEffect(() => {
        if (error) {
            setError('');
        }
    }, [password, confirmPassword]);

    // Countdown and redirect after success
    useEffect(() => {
        if (isSuccess && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
        if (isSuccess && countdown === 0) {
            navigate('/login', {
                replace: true,
                state: { passwordReset: true }
            });
        }
    }, [isSuccess, countdown, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!password.trim()) {
            setError('Please enter a new password.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;
        }

        if (!hasRecoverySession) {
            setError('Invalid or expired reset link. Please request a new password reset.');
            return;
        }

        setIsSubmitting(true);

        try {
            await updatePassword(password);
            setIsSuccess(true);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Reset failed';
            setError(getErrorMessage(message));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Password strength indicator
    const getPasswordStrength = (): { label: string; color: string; width: string } => {
        if (password.length === 0) return { label: '', color: 'bg-gray-200', width: '0%' };
        if (password.length < 6) return { label: 'Too short', color: 'bg-red-500', width: '25%' };
        if (password.length < 8) return { label: 'Weak', color: 'bg-orange-500', width: '50%' };
        if (password.length < 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            return { label: 'Good', color: 'bg-yellow-500', width: '75%' };
        }
        if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
            return { label: 'Strong', color: 'bg-green-500', width: '100%' };
        }
        return { label: 'Fair', color: 'bg-yellow-500', width: '50%' };
    };

    const passwordStrength = getPasswordStrength();

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
                        {isSuccess ? 'Password updated!' : 'Create a new password'}
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
                                Password Reset Successful!
                            </h2>
                            <p className="text-dark-500 mb-6 text-sm sm:text-base">
                                Your password has been updated successfully. You can now sign in with your new password.
                            </p>
                            <div className="bg-primary-50 rounded-xl p-4 mb-6">
                                <p className="text-primary-700 text-sm">
                                    Redirecting to login in <span className="font-bold">{countdown}</span> seconds...
                                </p>
                            </div>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 px-6
                                    bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl
                                    transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                <span>Sign In Now</span>
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    ) : (
                        /* Form State */
                        <>
                            <h2 className="text-xl sm:text-2xl font-bold text-dark-900 mb-2">
                                Reset Password
                            </h2>
                            <p className="text-dark-500 mb-6 text-sm sm:text-base">
                                Enter your new password below.
                            </p>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                                >
                                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                    <div>
                                        <p className="text-red-600 text-sm">{error}</p>
                                        {error.includes('expired') && (
                                            <Link
                                                to="/forgot-password"
                                                className="text-red-700 text-sm font-medium underline mt-1 inline-block"
                                            >
                                                Request new reset link
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* New Password */}
                                <div>
                                    <label className="block text-dark-700 text-sm font-medium mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 sm:py-3.5 pl-12 pr-12
                                                text-dark-900 placeholder-dark-400 text-sm sm:text-base
                                                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                                transition-all duration-200"
                                            placeholder="Enter new password"
                                            disabled={isSubmitting}
                                            autoComplete="new-password"
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
                                    {password.length > 0 && (
                                        <div className="mt-2">
                                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: passwordStrength.width }}
                                                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                                />
                                            </div>
                                            <p className={`text-xs mt-1 ${passwordStrength.color.includes('red') ? 'text-red-600' :
                                                passwordStrength.color.includes('orange') ? 'text-orange-600' :
                                                    passwordStrength.color.includes('yellow') ? 'text-yellow-600' :
                                                        'text-green-600'
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
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full bg-gray-50 border rounded-xl py-3 sm:py-3.5 pl-12 pr-12
                                                text-dark-900 placeholder-dark-400 text-sm sm:text-base
                                                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                                transition-all duration-200
                                                ${confirmPassword && password !== confirmPassword
                                                    ? 'border-red-300 focus:ring-red-500'
                                                    : confirmPassword && password === confirmPassword
                                                        ? 'border-green-300 focus:ring-green-500'
                                                        : 'border-gray-200'
                                                }`}
                                            placeholder="Confirm new password"
                                            disabled={isSubmitting}
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {confirmPassword && password !== confirmPassword && (
                                        <p className="text-red-600 text-xs mt-1">Passwords do not match</p>
                                    )}
                                    {confirmPassword && password === confirmPassword && password.length >= 6 && (
                                        <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                                            <CheckCircle size={12} /> Passwords match
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !hasRecoverySession}
                                    className="w-full py-3 sm:py-3.5 px-6 bg-primary-600 hover:bg-primary-700 
                                        disabled:bg-primary-400 disabled:cursor-not-allowed
                                        text-white font-semibold rounded-xl
                                        transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100
                                        flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Resetting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Reset Password</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Password Requirements */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-dark-600 text-xs sm:text-sm font-medium mb-2">Password requirements:</p>
                                <ul className="text-dark-500 text-xs sm:text-sm space-y-1">
                                    <li className={`flex items-center gap-2 ${password.length >= 6 ? 'text-green-600' : ''}`}>
                                        {password.length >= 6 ? <CheckCircle size={14} /> : <span className="w-3.5 h-3.5 rounded-full border border-gray-300" />}
                                        At least 6 characters
                                    </li>
                                    <li className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
                                        {/[A-Z]/.test(password) ? <CheckCircle size={14} /> : <span className="w-3.5 h-3.5 rounded-full border border-gray-300" />}
                                        One uppercase letter (recommended)
                                    </li>
                                    <li className={`flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-600' : ''}`}>
                                        {/[0-9]/.test(password) ? <CheckCircle size={14} /> : <span className="w-3.5 h-3.5 rounded-full border border-gray-300" />}
                                        One number (recommended)
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-dark-400 text-xs sm:text-sm mt-8">
                    Need a new reset link?{' '}
                    <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                        Request again
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};
