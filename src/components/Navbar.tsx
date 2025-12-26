import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'How We Work', href: '#how-we-work' },
        { name: 'About', href: '#about' },
    ];

    const scrollToSection = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navShell = isScrolled || isMobileMenuOpen
        ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-dark-100 py-4'
        : 'bg-transparent py-6';

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navShell}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-bold text-dark-900 cursor-pointer"
                        onClick={() => scrollToSection('#home')}
                    >
                        Digi<span className="text-primary-600">Roots</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }}
                                href={link.href}
                                className="text-dark-700 hover:text-primary-600 transition-colors duration-300 font-medium cursor-pointer"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button size="sm" onClick={() => scrollToSection('#contact')}>
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-dark-800 p-2"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 py-4 px-2 border-t border-dark-200 bg-white rounded-2xl shadow-lg"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                    href={link.href}
                                    className="text-dark-700 hover:text-primary-600 transition-colors duration-300 font-medium py-2 cursor-pointer"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button
                                size="sm"
                                className="w-full"
                                onClick={() => scrollToSection('#contact')}
                            >
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};
