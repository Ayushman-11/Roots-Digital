import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const values = [
    'Results-driven execution',
    'Transparent communication',
    'Scalable solutions',
    'Continuous innovation',
];

export const About: React.FC = () => {
    return (
        <section id="about" className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-900 mb-6">
                            About DigiRoots
                        </h2>
                        <div className="space-y-3 text-lg text-dark-600 leading-relaxed">
                            <p>
                                We're a digital transformation agency focused on helping businesses
                                scale through technology, automation, and strategic marketing.
                            </p>
                            <p>
                                Founded on the principle that modern businesses need modern solutions,
                                we combine technical expertise with business acumen to deliver results
                                that matter.
                            </p>
                            <p>
                                Our approach is simple: understand your goals, build the right solution,
                                automate what we can, and continuously optimize for growth.
                            </p>
                        </div>

                        {/* Values */}
                        <div className="mt-6 space-y-2.5">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="text-primary-600 flex-shrink-0" size={24} />
                                    <span className="text-dark-700 font-medium">{value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className="relative"
                    >
                        <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl relative overflow-hidden">
                            {/* Abstract shapes for visual interest */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="w-64 h-64 border-8 border-primary-300 rounded-full opacity-30"
                                />
                                <motion.div
                                    animate={{
                                        rotate: -360,
                                    }}
                                    transition={{
                                        duration: 15,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute w-48 h-48 border-8 border-primary-400 rounded-full opacity-40"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
