import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Globe, Workflow, Search, Share2, Target, Palette, Sparkles, ChevronRight } from 'lucide-react';
import { Card } from '../components/Card';

interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
    featured?: boolean;
    includes?: string[];
    bestFor?: string[];
}

const services: Service[] = [
    {
        icon: Globe,
        title: 'Website Development',
        description: 'Modern, fast, and responsive websites built with cutting-edge technologies. From landing pages to complex web applications.',
        includes: ['Custom Design', 'Responsive Layout', 'CMS Integration'],
        bestFor: ['Startups', 'E-commerce', 'Agencies'],
    },
    {
        icon: Workflow,
        title: 'Business Automation',
        description: 'Streamline operations with n8n workflows. Automate repetitive tasks and integrate your tools for maximum efficiency.',
        includes: ['n8n Workflows', 'API Integrations', 'Custom Scripts'],
        bestFor: ['Growing Businesses', 'SaaS', 'Operations Teams'],
    },
    {
        icon: Search,
        title: 'SEO Optimization',
        description: 'Rank higher on search engines with data-driven SEO strategies. More visibility means more customers.',
        includes: ['Keyword Research', 'On-page SEO', 'Technical Audit'],
        bestFor: ['Local Businesses', 'E-commerce', 'Blogs'],
    },
    {
        icon: Share2,
        title: 'Social Media Marketing',
        description: 'Build your brand presence across all platforms. Strategic content that engages and converts your audience.',
        includes: ['Content Strategy', 'Community Management', 'Analytics'],
        bestFor: ['Brands', 'Influencers', 'Retail'],
    },
    {
        icon: Target,
        title: 'Paid Advertising',
        description: 'ROI-focused ad campaigns on Google, Facebook, and LinkedIn. Every dollar spent is a strategic investment.',
        includes: ['Google Ads', 'Meta Ads', 'LinkedIn Campaigns'],
        bestFor: ['Lead Generation', 'E-commerce', 'B2B'],
    },
    {
        icon: Palette,
        title: 'Content & Design',
        description: 'Professional graphics, videos, and content that tell your brand story and capture attention.',
        includes: ['Brand Identity', 'Video Production', 'Copywriting'],
        bestFor: ['Rebranding', 'Product Launches', 'Marketing'],
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
            <div className="mb-3 sm:mb-4">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center
                    group-hover:bg-primary-600 transition-colors duration-300">
                    <service.icon className="text-primary-600 group-hover:text-white transition-colors duration-300 w-5 h-5 sm:w-7 sm:h-7" />
                </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-dark-900 mb-1.5 sm:mb-2">
                {service.title}
            </h3>
            <p className="text-sm sm:text-base text-dark-600 leading-relaxed">
                {service.description}
            </p>
            
            {/* Hover Reveal Section */}
            <div className="mt-4 pt-4 border-t border-dark-100 
                opacity-0 max-h-0 overflow-hidden
                group-hover:opacity-100 group-hover:max-h-40
                transition-all duration-300 ease-out">
                {service.includes && (
                    <div className="mb-3">
                        <p className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Includes</p>
                        <div className="flex flex-wrap gap-2">
                            {service.includes.map((item) => (
                                <span key={item} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-md">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {service.bestFor && (
                    <div className="flex items-center gap-2 text-dark-600 text-sm">
                        <ChevronRight size={14} className="text-primary-500" />
                        <span className="text-dark-400">Best for:</span>
                        <span>{service.bestFor.join(', ')}</span>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

// Regular Service Card Component
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="group h-full">
        <Card className="h-full">
            <div className="mb-3 sm:mb-4">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center
                    group-hover:bg-primary-600 transition-colors duration-300">
                    <service.icon className="text-primary-600 group-hover:text-white transition-colors duration-300 w-5 h-5 sm:w-7 sm:h-7" />
                </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-dark-900 mb-1.5 sm:mb-2">
                {service.title}
            </h3>
            <p className="text-sm sm:text-base text-dark-600 leading-relaxed">
                {service.description}
            </p>
            
            {/* Hover Reveal Section */}
            <div className="mt-4 pt-4 border-t border-dark-100 
                opacity-0 max-h-0 overflow-hidden
                group-hover:opacity-100 group-hover:max-h-40
                transition-all duration-300 ease-out">
                {service.includes && (
                    <div className="mb-3">
                        <p className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Includes</p>
                        <div className="flex flex-wrap gap-2">
                            {service.includes.map((item) => (
                                <span key={item} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-md">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {service.bestFor && (
                    <div className="flex items-center gap-2 text-dark-600 text-sm">
                        <ChevronRight size={14} className="text-primary-500" />
                        <span className="text-dark-400">Best for:</span>
                        <span>{service.bestFor.join(', ')}</span>
                    </div>
                )}
            </div>
        </Card>
    </div>
);

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
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
            </div>
        </section>
    );
};
