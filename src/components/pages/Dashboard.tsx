import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, LogOut, Home, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-50 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Logo */}
                        <Link to="/" className="text-xl sm:text-2xl font-bold text-dark-900">
                            Digi<span className="text-primary-600">Roots</span>
                        </Link>

                        {/* Right Section */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button className="p-1.5 sm:p-2 text-dark-500 hover:text-dark-700 transition-colors rounded-lg hover:bg-gray-100">
                                <Bell size={18} className="sm:w-5 sm:h-5" />
                            </button>
                            <button className="p-1.5 sm:p-2 text-dark-500 hover:text-dark-700 transition-colors rounded-lg hover:bg-gray-100">
                                <Settings size={18} className="sm:w-5 sm:h-5" />
                            </button>
                            <div className="w-px h-5 sm:h-6 bg-gray-200 hidden xs:block" />
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-white
                                    bg-primary-600 hover:bg-primary-700 rounded-lg transition-all duration-200"
                            >
                                <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 sm:mb-8"
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-900 mb-1 sm:mb-2">
                        Welcome back, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-sm sm:text-base text-dark-500">
                        Here's your profile overview.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 shadow-sm"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-dark-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                <User className="text-primary-600 w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            Profile Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Name */}
                            <div className="space-y-1 sm:space-y-2">
                                <label className="text-dark-500 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                                    <User size={12} className="sm:w-3.5 sm:h-3.5" />
                                    Full Name
                                </label>
                                <p className="text-dark-900 text-base sm:text-lg font-medium">{user?.name}</p>
                            </div>

                            {/* Email */}
                            <div className="space-y-1 sm:space-y-2">
                                <label className="text-dark-500 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                                    <Mail size={12} className="sm:w-3.5 sm:h-3.5" />
                                    Email Address
                                </label>
                                <p className="text-dark-900 text-base sm:text-lg font-medium break-all">{user?.email}</p>
                            </div>

                            {/* Role */}
                            <div className="space-y-1 sm:space-y-2">
                                <label className="text-dark-500 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                                    <Shield size={12} className="sm:w-3.5 sm:h-3.5" />
                                    Role
                                </label>
                                <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium
                                    ${user?.role === 'admin'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-primary-100 text-primary-700'
                                    }`}
                                >
                                    <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${user?.role === 'admin' ? 'bg-yellow-500' : 'bg-primary-500'
                                        }`} />
                                    {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                                </span>
                            </div>

                            {/* Member Since */}
                            <div className="space-y-1 sm:space-y-2">
                                <label className="text-dark-500 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                                    <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                                    Member Since
                                </label>
                                <p className="text-dark-900 text-base sm:text-lg font-medium">
                                    {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 shadow-sm"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-dark-900 mb-4 sm:mb-6">Quick Actions</h2>

                        <div className="space-y-2 sm:space-y-3">
                            <Link
                                to="/"
                                className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 
                                    border border-gray-200 transition-all duration-200 group"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center
                                    group-hover:bg-primary-200 transition-colors flex-shrink-0">
                                    <Home className="text-primary-600 w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-dark-900 font-medium text-sm sm:text-base">Go to Homepage</p>
                                    <p className="text-dark-500 text-xs sm:text-sm">View main website</p>
                                </div>
                            </Link>

                            <button
                                className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 
                                    border border-gray-200 transition-all duration-200 group text-left"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center
                                    group-hover:bg-primary-200 transition-colors flex-shrink-0">
                                    <Settings className="text-primary-600 w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-dark-900 font-medium text-sm sm:text-base">Account Settings</p>
                                    <p className="text-dark-500 text-xs sm:text-sm">Manage your account</p>
                                </div>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-primary-50 hover:bg-primary-100 
                                    border border-primary-200 transition-all duration-200 group text-left"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center
                                    group-hover:bg-primary-200 transition-colors flex-shrink-0">
                                    <LogOut className="text-primary-600 w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-primary-600 font-medium text-sm sm:text-base">Sign Out</p>
                                    <p className="text-dark-500 text-xs sm:text-sm">Logout from account</p>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4"
                >
                    {[
                        { label: 'Projects', value: '0', color: 'primary' },
                        { label: 'Active Tasks', value: '0', color: 'green' },
                        { label: 'Messages', value: '0', color: 'yellow' },
                        { label: 'Notifications', value: '0', color: 'purple' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-200 shadow-sm text-center"
                        >
                            <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color === 'primary' ? 'text-primary-600' :
                                    stat.color === 'green' ? 'text-green-600' :
                                        stat.color === 'yellow' ? 'text-yellow-600' :
                                            'text-purple-600'
                                }`}>
                                {stat.value}
                            </p>
                            <p className="text-dark-500 text-xs sm:text-sm mt-0.5 sm:mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
};
