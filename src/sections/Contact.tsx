import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

const serviceOptions = [
    'Website Development',
    'Business Automation (n8n / workflows)',
    'SEO Optimization',
    'Paid Advertising',
    'Full Digital Setup',
];

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        business: '',
        services: [] as string[],
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', business: '', services: [], message: '' });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleServiceToggle = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service],
        }));
    };

    return (
        <section id="contact" className="py-16 sm:py-20 bg-dark-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-900 mb-4">
                            Get Started Today
                        </h2>
                        <p className="text-lg sm:text-xl text-dark-600 mb-3">
                            Ready to transform your business? Let's talk about your project.
                        </p>
                        <p className="text-sm text-dark-500 flex items-center justify-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1">
                                <CheckCircle size={14} className="text-green-500" />
                                No spam
                            </span>
                            <span className="text-dark-300">•</span>
                            <span className="inline-flex items-center gap-1">
                                <CheckCircle size={14} className="text-green-500" />
                                Free consultation
                            </span>
                            <span className="text-dark-300">•</span>
                            <span className="inline-flex items-center gap-1">
                                <CheckCircle size={14} className="text-green-500" />
                                Response within 24 hours
                            </span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                        transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
                        className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-dark-100"
                    >
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                                {/* Name & Email Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 sm:py-3.5 border border-dark-200 rounded-xl 
                                                focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                                                outline-none transition-all duration-200
                                                hover:border-dark-300 shadow-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
                                            Work Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 sm:py-3.5 border border-dark-200 rounded-xl 
                                                focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                                                outline-none transition-all duration-200
                                                hover:border-dark-300 shadow-sm"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>

                                {/* Business Name */}
                                <div>
                                    <label htmlFor="business" className="block text-sm font-medium text-dark-700 mb-2">
                                        Company / Brand Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="business"
                                        name="business"
                                        required
                                        value={formData.business}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 sm:py-3.5 border border-dark-200 rounded-xl 
                                            focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                                            outline-none transition-all duration-200
                                            hover:border-dark-300 shadow-sm"
                                        placeholder="Your Company Inc."
                                    />
                                </div>

                                {/* Service Interest */}
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-3">
                                        What services are you interested in?
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {serviceOptions.map((service) => (
                                            <button
                                                key={service}
                                                type="button"
                                                onClick={() => handleServiceToggle(service)}
                                                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full 
                                                    transition-all duration-200 border-2
                                                    ${formData.services.includes(service)
                                                        ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                                                        : 'bg-white text-dark-600 border-dark-200 hover:border-primary-300 hover:text-primary-600'
                                                    }`}
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-2">
                                        What are you trying to build or automate? *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 sm:py-3.5 border border-dark-200 rounded-xl 
                                            focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                                            outline-none transition-all duration-200 resize-none
                                            hover:border-dark-300 shadow-sm"
                                        placeholder="Tell us about your project, goals, and timeline..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group w-full bg-primary-600 hover:bg-primary-700 text-white 
                                        font-semibold py-4 px-6 rounded-xl
                                        transition-all duration-300 ease-out
                                        hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25
                                        active:scale-[0.98]
                                        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                                        flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Get Free Strategy Call
                                            <ArrowRight 
                                                size={20} 
                                                className="group-hover:translate-x-1 transition-transform duration-300" 
                                            />
                                        </>
                                    )}
                                </button>

                                {/* Social Proof */}
                                <p className="text-sm text-dark-500 text-center pt-2">
                                    <span className="text-yellow-500">⭐</span> Trusted by startups & growing businesses 
                                    
                                </p>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="text-green-500" size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-dark-900 mb-2">
                                    Thank You!
                                </h3>
                                <p className="text-dark-600 mb-4">
                                    We've received your message and will get back to you within 24 hours.
                                </p>
                                <p className="text-sm text-dark-500">
                                    Check your inbox for a confirmation email.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
