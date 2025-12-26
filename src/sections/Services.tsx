import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Globe, Workflow, Search, Share2, Target, Palette } from 'lucide-react';
import { Card } from '../components/Card';

interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
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

export const Services: React.FC = () => {
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

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                            transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                        >
                            <Card>
                                <div className="mb-4">
                                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                                        <service.icon className="text-primary-600" size={28} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-dark-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-dark-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
