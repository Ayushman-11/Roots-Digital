import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Compass, Hammer, Cog, TrendingUp } from 'lucide-react';

interface Step {
    icon: LucideIcon;
    number: string;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        icon: Compass,
        number: '01',
        title: 'Discover',
        description: 'We analyze your business, understand your goals, and identify opportunities for growth and automation.',
    },
    {
        icon: Hammer,
        number: '02',
        title: 'Build',
        description: 'Our team designs and develops custom solutions tailored to your specific needs and brand identity.',
    },
    {
        icon: Cog,
        number: '03',
        title: 'Automate',
        description: 'We implement smart automation workflows that save time, reduce errors, and scale with your business.',
    },
    {
        icon: TrendingUp,
        number: '04',
        title: 'Optimize',
        description: 'Continuous monitoring, testing, and refinement to ensure maximum performance and ROI.',
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
                    <div className="grid grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
                                transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
                                className="relative"
                            >
                                <div className="flex justify-center mb-8">
                                    <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center shadow-lg relative z-10">
                                        <step.icon className="text-white" size={32} />
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-dark-100">
                                    <div className="text-5xl font-bold text-primary-100 mb-2">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-bold text-dark-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-dark-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Steps - Mobile/Tablet Vertical */}
                <div className="lg:hidden space-y-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, x: -32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                            transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
                            className="flex gap-6"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                                    <step.icon className="text-white" size={28} />
                                </div>
                            </div>

                            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-dark-100">
                                <div className="text-4xl font-bold text-primary-100 mb-2">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-dark-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-dark-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
