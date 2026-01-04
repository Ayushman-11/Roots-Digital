import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const values = [
    'Results-driven execution',
    'Transparent communication',
    'Scalable solutions',
    'Continuous innovation',
];

// SVG Visual component with scroll-triggered animations
const SVGVisual: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
        >
            <div className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                {/* Subtle animated background - floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {/* Gradient mesh base */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-primary-100/20" />

                    {/* Floating particles */}
                    <div className="absolute w-3 h-3 rounded-full bg-primary-300/20 top-[15%] left-[20%] animate-[float_8s_ease-in-out_infinite]" />
                    <div className="absolute w-2 h-2 rounded-full bg-primary-400/15 top-[45%] left-[10%] animate-[float_10s_ease-in-out_infinite_1s]" />
                    <div className="absolute w-4 h-4 rounded-full bg-primary-200/25 top-[70%] left-[25%] animate-[float_7s_ease-in-out_infinite_0.5s]" />
                    <div className="absolute w-2 h-2 rounded-full bg-primary-300/20 top-[25%] right-[15%] animate-[float_9s_ease-in-out_infinite_2s]" />
                    <div className="absolute w-3 h-3 rounded-full bg-primary-400/15 top-[60%] right-[20%] animate-[float_11s_ease-in-out_infinite_1.5s]" />
                    <div className="absolute w-2 h-2 rounded-full bg-primary-200/20 top-[85%] right-[35%] animate-[float_8s_ease-in-out_infinite_3s]" />

                    {/* Soft glow accents */}
                    <div className="absolute w-32 h-32 rounded-full bg-primary-200/10 blur-3xl top-[10%] left-[5%] animate-[pulse_6s_ease-in-out_infinite]" />
                    <div className="absolute w-24 h-24 rounded-full bg-primary-300/10 blur-2xl bottom-[15%] right-[10%] animate-[pulse_8s_ease-in-out_infinite_2s]" />
                </div>

                {/* Animated SVG - key prop forces re-render when in view */}
                <svg
                    key={isInView ? 'visible' : 'hidden'}
                    viewBox="0 0 400 400"
                    className="relative w-full h-full"
                    style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.3s' }}
                >
                    <defs>
                        <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#0284c7" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Grid lines */}
                    <g stroke="#bae6fd" strokeWidth="1" opacity="0.5">
                        <line x1="80" y1="320" x2="320" y2="320" />
                        <line x1="80" y1="260" x2="320" y2="260" strokeDasharray="4,4" />
                        <line x1="80" y1="200" x2="320" y2="200" strokeDasharray="4,4" />
                        <line x1="80" y1="140" x2="320" y2="140" strokeDasharray="4,4" />
                    </g>

                    {isInView && (
                        <>
                            {/* Rising bars with animation */}
                            <g>
                                <rect x="100" y="320" width="35" height="0" fill="url(#barGradient)" rx="4">
                                    <animate attributeName="height" from="0" to="80" dur="1s" begin="0s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                                    <animate attributeName="y" from="320" to="240" dur="1s" begin="0s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                                </rect>
                                <rect x="155" y="320" width="35" height="0" fill="url(#barGradient)" rx="4">
                                    <animate attributeName="height" from="0" to="120" dur="1s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                                    <animate attributeName="y" from="320" to="200" dur="1s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                                </rect>
                                <rect x="210" y="320" width="35" height="0" fill="url(#barGradient)" rx="4">
                                    <animate attributeName="height" from="0" to="150" dur="1s" begin="0.4s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                                    <animate attributeName="y" from="320" to="170" dur="1s" begin="0.4s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                                </rect>
                                <rect x="265" y="320" width="35" height="0" fill="url(#barGradient)" rx="4">
                                    <animate attributeName="height" from="0" to="180" dur="1s" begin="0.6s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                                    <animate attributeName="y" from="320" to="140" dur="1s" begin="0.6s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                                </rect>
                            </g>

                            {/* Growth trend line */}
                            <path
                                d="M 117 240 Q 172 200 227 220 T 282 140"
                                fill="none"
                                stroke="#0ea5e9"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="200"
                                strokeDashoffset="200"
                                filter="url(#glow)"
                            >
                                <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.5s" begin="0.8s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
                            </path>

                            {/* Connection nodes - Automation network */}
                            <g filter="url(#glow)">
                                {/* Central hub */}
                                <circle cx="200" cy="90" r="20" fill="url(#nodeGradient)">
                                    <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <text x="200" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">AI</text>

                                {/* Satellite nodes */}
                                <circle cx="120" cy="70" r="12" fill="#38bdf8" opacity="0">
                                    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.2s" fill="freeze" />
                                    <animate attributeName="r" values="10;14;10" dur="3s" begin="1.2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="280" cy="70" r="12" fill="#38bdf8" opacity="0">
                                    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.4s" fill="freeze" />
                                    <animate attributeName="r" values="10;14;10" dur="3s" begin="1.4s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="150" cy="130" r="10" fill="#7dd3fc" opacity="0">
                                    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.6s" fill="freeze" />
                                </circle>
                                <circle cx="250" cy="130" r="10" fill="#7dd3fc" opacity="0">
                                    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.8s" fill="freeze" />
                                </circle>

                                {/* Connection lines */}
                                <line x1="180" y1="85" x2="132" y2="75" stroke="#38bdf8" strokeWidth="2" opacity="0">
                                    <animate attributeName="opacity" from="0" to="0.7" dur="0.3s" begin="1.2s" fill="freeze" />
                                </line>
                                <line x1="220" y1="85" x2="268" y2="75" stroke="#38bdf8" strokeWidth="2" opacity="0">
                                    <animate attributeName="opacity" from="0" to="0.7" dur="0.3s" begin="1.4s" fill="freeze" />
                                </line>
                                <line x1="185" y1="105" x2="158" y2="122" stroke="#7dd3fc" strokeWidth="2" opacity="0">
                                    <animate attributeName="opacity" from="0" to="0.7" dur="0.3s" begin="1.6s" fill="freeze" />
                                </line>
                                <line x1="215" y1="105" x2="242" y2="122" stroke="#7dd3fc" strokeWidth="2" opacity="0">
                                    <animate attributeName="opacity" from="0" to="0.7" dur="0.3s" begin="1.8s" fill="freeze" />
                                </line>
                            </g>

                            {/* Data pulse circles */}
                            <circle cx="200" cy="90" r="25" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0">
                                <animate attributeName="r" values="25;50;50" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.6;0;0" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="200" cy="90" r="25" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0">
                                <animate attributeName="r" values="25;50;50" dur="2s" begin="1s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.6;0;0" dur="2s" begin="1s" repeatCount="indefinite" />
                            </circle>

                            {/* Arrow indicator */}
                            <g transform="translate(300, 100)" opacity="0">
                                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2s" fill="freeze" />
                                <path d="M 0 30 L 0 0 L -10 10 M 0 0 L 10 10" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <animateTransform attributeName="transform" type="translate" values="0,5;0,-5;0,5" dur="1.5s" repeatCount="indefinite" />
                                </path>
                            </g>

                            {/* Percentage label */}
                            <g opacity="0">
                                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.2s" fill="freeze" />
                                <text x="320" y="135" fill="#0284c7" fontSize="16" fontWeight="bold">
                                    +127%
                                    <animateTransform attributeName="transform" type="translate" values="0,3;0,-3;0,3" dur="1.5s" repeatCount="indefinite" />
                                </text>
                            </g>
                        </>
                    )}
                </svg>
            </div>
        </motion.div>
    );
};

export const About: React.FC = () => {
    return (
        <section id="about" className="py-16 sm:py-20 bg-white scroll-mt-16 sm:scroll-mt-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className="text-left"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 mb-3 text-left">
                            About <span className="text-primary-600">DigiRoots</span>
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl font-medium text-dark-700 mb-6 text-left">
                            Where strategy meets automation to scale modern businesses.
                        </p>
                        <div className="space-y-3 text-base sm:text-lg text-dark-600 leading-relaxed text-left">
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
                        <div className="mt-6 space-y-2">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group flex items-center gap-3 p-3 -ml-3 rounded-xl
                                        hover:bg-primary-50 transition-all duration-300 cursor-default"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center
                                        rounded-full bg-primary-100 group-hover:bg-primary-500 
                                        group-hover:scale-110 group-hover:rotate-12
                                        transition-all duration-300">
                                        <CheckCircle2
                                            className="text-primary-600 group-hover:text-white transition-colors duration-300"
                                            size={20}
                                        />
                                    </div>
                                    <span className="text-dark-700 font-medium group-hover:text-dark-900 
                                        group-hover:translate-x-1 transition-all duration-300">
                                        {value}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual Element - Animated SVG */}
                    <SVGVisual />
                </div>

            </div>
        </section>
    );
};
