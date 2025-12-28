import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Globe, Workflow, Search, Share2, Target, Palette, Sparkles, ChevronDown } from 'lucide-react';
import { Card } from '../components/Card';

interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
    featured?: boolean;
}

const services: Service[] = [
    {
        icon: Globe,
        title: 'Website Development',
        description: 'Modern, fast, and responsive websites built with cutting-edge technologies. From landing pages to complex web applications.',
    },
    {
        icon: Workflow,
        title: 'Business Automation',
        description: 'Streamline operations with n8n workflows. Automate repetitive tasks and integrate your tools for maximum efficiency.',
    },
    {
        icon: Search,
        title: 'SEO Optimization',
        description: 'Rank higher on search engines with data-driven SEO strategies. More visibility means more customers.',
    },
    {
        icon: Share2,
        title: 'Social Media Marketing',
        description: 'Build your brand presence across all platforms. Strategic content that engages and converts your audience.',
    },
    {
        icon: Target,
        title: 'Paid Advertising',
        description: 'ROI-focused ad campaigns on Google, Facebook, and LinkedIn. Every dollar spent is a strategic investment.',
    },
    {
        icon: Palette,
        title: 'Content & Design',
        description: 'Professional graphics, videos, and content that tell your brand story and capture attention.',
    },
];

// Featured Service Card Component
const FeaturedServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <motion.div
        whileHover={{ 
            y: -12, 
            scale: 1.03,
            transition: { duration: 0.3, ease: 'easeOut' } 
        }}
        className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 
            shadow-xl shadow-primary-500/20
            hover:shadow-2xl hover:shadow-primary-500/30
            transition-all duration-300 ease-out
            cursor-pointer border-2 border-primary-500
            overflow-hidden h-full"
    >
        {/* Background glow effect */}
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        {/* Featured Badge */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1 sm:gap-1.5 bg-primary-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">Most In-Demand</span>
            <span className="sm:hidden">Popular</span>
        </div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0
                    group-hover:bg-primary-600 transition-colors duration-300">
                    <service.icon className="text-primary-600 group-hover:text-white transition-colors duration-300 w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-900">
                    {service.title}
                </h3>
            </div>
            <p className="text-sm sm:text-base text-dark-600 leading-relaxed">
                {service.description}
            </p>
        </div>
    </motion.div>
);

// Regular Service Card Component
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="group h-full">
        <Card className="h-full">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0
                    group-hover:bg-primary-600 transition-colors duration-300">
                    <service.icon className="text-primary-600 group-hover:text-white transition-colors duration-300 w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-dark-900">
                    {service.title}
                </h3>
            </div>
            <p className="text-sm sm:text-base text-dark-600 leading-relaxed">
                {service.description}
            </p>
        </Card>
    </div>
);

export const Services: React.FC = () => {
    const [showAllMobile, setShowAllMobile] = useState(false);

    return (
        <section id="services" className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-900 mb-4">
                        Our Services
                    </h2>
                    <p className="text-lg sm:text-xl text-dark-600 max-w-2xl mx-auto">
                        Comprehensive digital solutions designed to grow your business
                    </p>
                </motion.div>

                {/* Cards - Desktop/Tablet (sm and above) - Always show all */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                            transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                        >
                            {service.featured ? (
                                <FeaturedServiceCard service={service} />
                            ) : (
                                <ServiceCard service={service} />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Cards - Mobile Only - Show first 2, then expand */}
                <div className="sm:hidden">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Always show first 2 services */}
                        {services.slice(0, 2).map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                                transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                            >
                                {service.featured ? (
                                    <FeaturedServiceCard service={service} />
                                ) : (
                                    <ServiceCard service={service} />
                                )}
                            </motion.div>
                        ))}

                        {/* Remaining services - shown when expanded */}
                        <AnimatePresence>
                            {showAllMobile && (
                                <>
                                    {services.slice(2).map((service, index) => (
                                        <motion.div
                                            key={service.title}
                                            initial={{ opacity: 0, y: 24, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                                            exit={{ opacity: 0, y: -12, height: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                                        >
                                            {service.featured ? (
                                                <FeaturedServiceCard service={service} />
                                            ) : (
                                                <ServiceCard service={service} />
                                            )}
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Learn More / Show Less Button - Mobile Only */}
                    {!showAllMobile ? (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            onClick={() => setShowAllMobile(true)}
                            className="w-full mt-6 py-3.5 px-6 bg-primary-50 hover:bg-primary-100 
                                text-primary-600 font-semibold rounded-xl
                                flex items-center justify-center gap-2
                                transition-all duration-300 border border-primary-200"
                        >
                            View All Services
                            <ChevronDown size={20} />
                        </motion.button>
                    ) : (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setShowAllMobile(false)}
                            className="w-full mt-6 py-3.5 px-6 bg-dark-100 hover:bg-dark-200 
                                text-dark-600 font-semibold rounded-xl
                                flex items-center justify-center gap-2
                                transition-all duration-300"
                        >
                            Show Less
                            <ChevronDown size={20} className="rotate-180" />
                        </motion.button>
                    )}
                </div>
            </div>
        </section>
    );
};
