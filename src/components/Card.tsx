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
            whileHover={hover ? { 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' } 
            } : {}}
            className={`
                bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-dark-100
                shadow-md shadow-dark-200/20
                hover:shadow-2xl hover:shadow-primary-500/15
                hover:border-primary-200
                transition-all duration-300 ease-out
                cursor-pointer
                ${className}
            `}
        >
            {children}
        </motion.div>
    );
};
