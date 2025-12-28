import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { Scene3D } from '../components/Scene3D';

export const Hero: React.FC = () => {
    const scrollToContact = () => {
        const element = document.querySelector('#contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToServices = () => {
        const element = document.querySelector('#services');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-dark-50 bg-fixed py-16 sm:py-20">
            {/* 3D Animated Background */}
            <Scene3D />
            
            {/* Soft gradient blobs for depth */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-16 -left-8 h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full bg-primary-200/40 blur-3xl" />
                <div className="absolute top-10 -right-8 sm:right-0 h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 rounded-full bg-primary-100/50 blur-3xl" />
                <div className="absolute bottom-[-4rem] left-1/4 sm:left-1/3 h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 rounded-full bg-dark-100/60 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-dark-50" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto text-center space-y-6">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full border border-primary-200 shadow-sm"
                    >
                        <Sparkles size={16} />
                        <span className="text-sm font-medium">Digital Transformation Made Simple</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-900 leading-tight px-2 sm:px-0"
                    >
                        <span className="block sm:inline">Digital, Automation</span>
                        <span className="block sm:inline"> & Growth</span>
                        <br className="hidden sm:block" />
                        <span className="text-primary-600 block sm:inline">Solutions for Modern Businesses</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                        className="text-lg sm:text-xl md:text-2xl text-dark-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        We help businesses scale faster with cutting-edge websites, smart automation,
                        and data-driven marketing strategies.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button size="lg" onClick={scrollToContact}>
                            Get Started
                            <ArrowRight size={20} />
                        </Button>
                        <Button size="lg" variant="outline" onClick={scrollToServices}>
                            View Services
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                        className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 max-w-3xl mx-auto px-2 sm:px-0"
                    >
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-900">50+</div>
                            <div className="text-xs sm:text-sm md:text-base text-dark-600 mt-1 sm:mt-2">Projects Delivered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-900">98%</div>
                            <div className="text-xs sm:text-sm md:text-base text-dark-600 mt-1 sm:mt-2">Client Satisfaction</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-900">24/7</div>
                            <div className="text-xs sm:text-sm md:text-base text-dark-600 mt-1 sm:mt-2">Support Available</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:block"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-dark-300 rounded-full flex items-start justify-center p-2"
                >
                    <motion.div className="w-1.5 h-1.5 bg-dark-400 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};
