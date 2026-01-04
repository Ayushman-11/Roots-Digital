import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark-900 text-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">
                            Digi<span className="text-primary-500">Roots</span>
                        </h3>
                        <p className="text-dark-300 mb-4 max-w-md">
                            Digital, Automation & Growth Solutions for Modern Businesses.
                            We help companies scale through technology and smart automation.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark-400 hover:text-primary-500 transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark-400 hover:text-primary-500 transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark-400 hover:text-primary-500 transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#services" className="text-dark-300 hover:text-primary-500 transition-colors">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#how-we-work" className="text-dark-300 hover:text-primary-500 transition-colors">
                                    How We Work
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-dark-300 hover:text-primary-500 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-dark-300 hover:text-primary-500 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-dark-300">
                                <Mail size={16} />
                                <a href="mailto:hello@digiroots.com" className="hover:text-primary-500 transition-colors">
                                    contact.rootsdigital@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-dark-300">
                                <Phone size={16} />
                                <a href="tel:+1234567890" className="hover:text-primary-500 transition-colors">
                                    +91 7028469067
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-dark-800 pt-8 text-center text-dark-400 text-sm">
                    <p>&copy; {currentYear} Roots Digital. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
