import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Compass, Hammer, Cog, TrendingUp, ChevronRight, Target } from 'lucide-react';

interface Step {
    icon: LucideIcon;
    number: string;
    title: string;
    description: string;
    outcome: string;
    tools: string[];
}

const steps: Step[] = [
    {
        icon: Compass,
        number: '01',
        title: 'Discover',
        description: 'We analyze your business, understand your goals, and identify opportunities for growth and automation.',
        outcome: 'Clear roadmap with actionable insights and prioritized opportunities',
        tools: ['Google Analytics', 'Search Console', 'Hotjar', 'Figma', 'Notion'],
    },
    {
        icon: Hammer,
        number: '02',
        title: 'Build',
        description: 'Our team designs and develops custom solutions tailored to your specific needs and brand identity.',
        outcome: 'Pixel-perfect deliverables ready for launch and customer engagement',
        tools: ['React', 'Next.js', 'Tailwind', 'WordPress', 'GitHub', 'Vercel'],
    },
    {
        icon: Cog,
        number: '03',
        title: 'Automate',
        description: 'We implement smart automation workflows that save time, reduce errors, and scale with your business.',
        outcome: 'Save 10+ hours weekly with automated workflows running 24/7',
        tools: ['n8n', 'Zapier', 'Make', 'Google Sheets', 'APIs'],
    },
    {
        icon: TrendingUp,
        number: '04',
        title: 'Optimize',
        description: 'Continuous monitoring, testing, and refinement to ensure maximum performance and ROI.',
        outcome: 'Data-driven growth with measurable improvements in key metrics',
        tools: ['GA4', 'Search Console', 'Ahrefs', 'Meta Ads', 'Google Ads'],
    },
];

export const HowWeWork: React.FC = () => {
    return (
        <section id="how-we-work" className="py-16 sm:py-20 bg-dark-50">
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
                        How We Work
                    </h2>
                    <p className="text-lg sm:text-xl text-dark-600 max-w-2xl mx-auto">
                        A proven process that delivers results consistently
                    </p>
                </motion.div>

                {/* Steps - Desktop Horizontal */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-10 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-primary-300 z-0" />
                        
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
                                transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
                                className="relative group"
                            >
                                {/* Arrow connector between steps */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-10 -right-4 transform -translate-y-1/2 z-20">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-primary-200">
                                            <ChevronRight className="text-primary-500" size={18} />
                                        </div>
                                    </div>
                                )}
                                
                                <div className="flex justify-center mb-8">
                                    <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center shadow-lg relative z-10
                                        group-hover:bg-primary-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]
                                        transition-all duration-300 ease-out">
                                        <step.icon className="text-white group-hover:scale-110 transition-transform duration-300" size={32} />
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-dark-100
                                    group-hover:shadow-xl group-hover:border-primary-400 group-hover:scale-[1.02]
                                    transition-all duration-300 ease-out cursor-pointer">
                                    <div className="text-5xl font-bold text-primary-100 group-hover:text-primary-500 transition-colors duration-300 mb-2">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-bold text-dark-900 group-hover:text-primary-600 transition-colors duration-300 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-dark-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                    
                                    {/* Tools Used */}
                                    <div className="mt-4 pt-3 border-t border-dark-100">
                                        <p className="text-[10px] font-semibold text-dark-400 uppercase tracking-wider mb-2">Tools</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {step.tools.map((tool) => (
                                                <span
                                                    key={tool}
                                                    className={`px-2 py-0.5 text-[11px] font-medium rounded-full transition-colors duration-300
                                                        ${tool === 'n8n' 
                                                            ? 'bg-primary-500 text-white group-hover:bg-primary-600' 
                                                            : 'text-dark-500 bg-dark-100 group-hover:bg-primary-100 group-hover:text-primary-600'
                                                        }`}
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Hover Reveal - Business Outcome */}
                                    <div className="mt-4 pt-4 border-t border-dark-100
                                        opacity-0 max-h-0 overflow-hidden
                                        group-hover:opacity-100 group-hover:max-h-24
                                        transition-all duration-300 ease-out">
                                        <div className="flex items-start gap-2">
                                            <Target className="text-primary-500 flex-shrink-0 mt-0.5" size={16} />
                                            <div>
                                                <p className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-1">Business Outcome</p>
                                                <p className="text-sm text-dark-700 font-medium">{step.outcome}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Steps - Mobile/Tablet Vertical */}
                <div className="lg:hidden relative">
                    {/* Vertical connecting line */}
                    <div className="absolute left-6 sm:left-10 top-12 bottom-12 w-[2px] border-l-2 border-dashed border-primary-300 z-0" />
                    
                    <div className="space-y-6 sm:space-y-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                                transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
                                className="flex gap-3 sm:gap-6 group relative"
                            >
                                <div className="flex-shrink-0 relative">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-primary-600 rounded-full flex items-center justify-center shadow-lg
                                        group-hover:bg-primary-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]
                                        transition-all duration-300 ease-out relative z-10">
                                        <step.icon className="text-white group-hover:scale-110 transition-transform duration-300" size={20} />
                                    </div>
                                    {/* Downward arrow between steps */}
                                    {index < steps.length - 1 && (
                                        <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-primary-200">
                                                <ChevronRight className="text-primary-500 rotate-90" size={12} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-dark-100
                                    group-hover:shadow-xl group-hover:border-primary-400 group-hover:scale-[1.01] sm:group-hover:scale-[1.02]
                                    transition-all duration-300 ease-out cursor-pointer">
                                    <div className="text-3xl sm:text-4xl font-bold text-primary-100 group-hover:text-primary-500 transition-colors duration-300 mb-1 sm:mb-2">
                                        {step.number}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-dark-900 group-hover:text-primary-600 transition-colors duration-300 mb-2 sm:mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-dark-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                    
                                    {/* Tools Used */}
                                    <div className="mt-4 pt-3 border-t border-dark-100">
                                        <p className="text-[10px] font-semibold text-dark-400 uppercase tracking-wider mb-2">Tools</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {step.tools.map((tool) => (
                                                <span
                                                    key={tool}
                                                    className={`px-2 py-0.5 text-[11px] font-medium rounded-full transition-colors duration-300
                                                        ${tool === 'n8n' 
                                                            ? 'bg-primary-500 text-white group-hover:bg-primary-600' 
                                                            : 'text-dark-500 bg-dark-100 group-hover:bg-primary-100 group-hover:text-primary-600'
                                                        }`}
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Hover Reveal - Business Outcome */}
                                    <div className="mt-4 pt-4 border-t border-dark-100
                                        opacity-0 max-h-0 overflow-hidden
                                        group-hover:opacity-100 group-hover:max-h-24
                                        transition-all duration-300 ease-out">
                                        <div className="flex items-start gap-2">
                                            <Target className="text-primary-500 flex-shrink-0 mt-0.5" size={16} />
                                            <div>
                                                <p className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-1">Business Outcome</p>
                                                <p className="text-sm text-dark-700 font-medium">{step.outcome}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
