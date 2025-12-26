import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = true
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            whileHover={hover ? { y: -6, transition: { duration: 0.25 } } : {}}
            className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-dark-100 ${className}`}
        >
            {children}
        </motion.div>
    );
};
