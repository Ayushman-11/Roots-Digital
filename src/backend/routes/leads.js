import express from 'express';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

/**
 * @route   POST /api/leads
 * @desc    Submit a new lead (Get Started form)
 * @access  Public
 */
router.post('/', async (req, res) => {
    try {
        const { name, companyName, email, phone, serviceInterested, message } = req.body;

        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Admin email (where lead notifications are sent)
        const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

        if (!adminEmail) {
            console.error('ADMIN_EMAIL not configured');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        // Format the current date
        const submittedAt = new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });

        // Email subject
        const emailSubject = '🚀 New Lead from DigiRoots Website';

        // Plain text version
        const emailText = `
New Lead Submission
====================

Name: ${name}
Company: ${companyName || 'Not provided'}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Interested: ${serviceInterested || 'Not specified'}

Message:
${message || 'No message provided'}

---
Submitted on: ${submittedAt}
        `.trim();

        // HTML version
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🚀 New Lead Received!</h1>
    </div>
    
    <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
        <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; width: 140px;">Name:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${name}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Company:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">${companyName || '<span style="color: #999;">Not provided</span>'}</td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                </td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Phone:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    ${phone ? `<a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>` : '<span style="color: #999;">Not provided</span>'}
                </td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Service:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    ${serviceInterested ? `<span style="background: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${serviceInterested}</span>` : '<span style="color: #999;">Not specified</span>'}
                </td>
            </tr>
        </table>

        <h3 style="color: #333; margin-top: 25px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h3>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
            <p style="margin: 0; color: #555; white-space: pre-wrap;">${message || '<em style="color: #999;">No message provided</em>'}</p>
        </div>
    </div>

    <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px; text-align: center;">
        <p style="margin: 0; color: #666; font-size: 13px;">
            📅 Submitted on: ${submittedAt}
        </p>
        <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
            This is an automated notification from DigiRoots Website
        </p>
    </div>
</body>
</html>
        `.trim();

        // Notify both admin and submitter in parallel so one failure does not block the other
        const adminMail = sendEmail({
            to: adminEmail,
            subject: emailSubject,
            text: emailText,
            html: emailHtml
        });

        const submitterMail = sendEmail({
            to: email,
            subject: 'We received your inquiry at DigiRoots',
            text: `Hi ${name},\n\nThanks for reaching out! We received your details and will respond within one business day. If you need to add anything else, just reply to this email.\n\nSummary:\n- Name: ${name}\n- Company: ${companyName || 'Not provided'}\n- Service: ${serviceInterested || 'Not specified'}\n- Message: ${message || 'No message provided'}\n\nTalk soon,\nTeam DigiRoots`,
            html: `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background: #1f2937; color: white; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 22px;">We received your inquiry</h2>
    </div>
    <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
        <p>Hi ${name},</p>
        <p>Thanks for reaching out to DigiRoots. We have your details and will reply within one business day.</p>
        <p style="margin-bottom: 12px; font-weight: 600;">Summary</p>
        <ul style="padding-left: 18px; margin: 0 0 16px 0; color: #4b5563;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Company:</strong> ${companyName || 'Not provided'}</li>
            <li><strong>Service:</strong> ${serviceInterested || 'Not specified'}</li>
            <li><strong>Message:</strong> ${message || 'No message provided'}</li>
        </ul>
        <p style="margin: 0; color: #6b7280; font-size: 14px;">If you want to add anything, just reply to this email.</p>
    </div>
    <div style="background: #f9fafb; padding: 16px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; text-align: center; color: #6b7280; font-size: 13px;">
        <p style="margin: 0;">Team DigiRoots</p>
    </div>
</body>
</html>
            `.trim()
        });

        await Promise.all([adminMail, submitterMail]);

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Thank you! We\'ve received your inquiry and will get back to you soon.'
        });

    } catch (error) {
        console.error('Lead Submission Error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to submit your request. Please try again later.'
        });
    }
});

export default router;
