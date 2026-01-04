import nodemailer from 'nodemailer';

/**
 * Send email utility function
 * Uses nodemailer with Gmail or custom SMTP
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content (optional)
 * @returns {Promise<void>}
 */
const sendEmail = async (options) => {
    // Use port 465 with SSL for better compatibility with cloud hosting
    const port = parseInt(process.env.SMTP_PORT) || 465;
    const secure = port === 465; // true for 465, false for 587

    // Create transporter based on environment
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: port,
        secure: secure,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        // Longer timeout for cloud environments
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
    });

    // Define email options
    const mailOptions = {
        from: `"DigiRoots" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html || undefined
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent:', info.messageId);
    return info;
};

export default sendEmail;
