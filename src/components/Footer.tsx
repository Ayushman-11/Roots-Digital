import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Instagram, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-dark-900 to-dark-950 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
                        <h3 className="text-2xl font-bold mb-4">
                            Digi<span className="text-primary-500">Roots</span>
                        </h3>
                        <p className="text-dark-300 mb-6 max-w-md mx-auto sm:mx-0 leading-relaxed">
                            DigiRoots helps startups and businesses grow through modern websites,
                            smart automation, and performance-driven marketing.
                        </p>
                        <div className="flex gap-3 justify-center sm:justify-start">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow us on LinkedIn"
                                className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center
                                    text-dark-400 hover:text-white hover:bg-primary-600 
                                    hover:scale-110 transition-all duration-300"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow us on Twitter"
                                className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center
                                    text-dark-400 hover:text-white hover:bg-primary-600 
                                    hover:scale-110 transition-all duration-300"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow us on Instagram"
                                className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center
                                    text-dark-400 hover:text-white hover:bg-pink-600 
                                    hover:scale-110 transition-all duration-300"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center sm:text-left">
                        <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#services" className="text-dark-300 hover:text-primary-400 transition-colors duration-200 inline-block">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#how-we-work" className="text-dark-300 hover:text-primary-400 transition-colors duration-200 inline-block">
                                    How We Work
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-dark-300 hover:text-primary-400 transition-colors duration-200 inline-block">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-dark-300 hover:text-primary-400 transition-colors duration-200 inline-block">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="text-center sm:text-left">
                        <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
                        <ul className="space-y-3">
                            <li>
                                <a 
                                    href="mailto:hello@digiroots.com" 
                                    className="inline-flex items-center gap-2 text-dark-300 hover:text-primary-400 transition-colors duration-200"
                                >
                                    <Mail size={16} className="flex-shrink-0" />
                                    hello@digiroots.com
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="tel:+1234567890" 
                                    className="inline-flex items-center gap-2 text-dark-300 hover:text-primary-400 transition-colors duration-200"
                                >
                                    <Phone size={16} className="flex-shrink-0" />
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-dark-400 justify-center sm:justify-start">
                                <Clock size={16} className="flex-shrink-0" />
                                <span className="text-sm">Mon–Sat | 10AM–7PM IST</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-dark-800 bg-dark-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                        <p className="text-dark-500 text-sm">
                            &copy; {currentYear} DigiRoots. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 text-dark-500 text-sm">
                            <a href="#" className="hover:text-dark-300 transition-colors duration-200">Privacy Policy</a>
                            <span className="text-dark-700">|</span>
                            <a href="#" className="hover:text-dark-300 transition-colors duration-200">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
