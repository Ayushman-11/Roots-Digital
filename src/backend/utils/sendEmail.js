import { Resend } from 'resend';
import nodemailer from 'nodemailer';

/**
 * Send email utility function
 * Uses Resend API (for production) or Nodemailer (for local development)
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content (optional)
 * @returns {Promise<void>}
 */
const sendEmail = async (options) => {
    // Use Resend in production (when API key is available)
    if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM || 'DigiRoots <onboarding@resend.dev>',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html || undefined,
        });

        if (error) {
            console.error('Resend Error:', error);
            throw new Error(error.message);
        }

        console.log('Email sent via Resend:', data?.id);
        return data;
    }

    // Fallback to Nodemailer for local development
    const port = parseInt(process.env.SMTP_PORT) || 587;
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: port,
        secure: secure,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
    });

    const mailOptions = {
        from: `"DigiRoots" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html || undefined
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent via Nodemailer:', info.messageId);
    return info;
};

export default sendEmail;
