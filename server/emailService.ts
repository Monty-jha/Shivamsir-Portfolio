import { MailService } from '@sendgrid/mail';
import type { Contact } from '@shared/schema';

const mailService = new MailService();

// Initialize SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('SendGrid API key not configured. Email not sent.');
      return false;
    }

    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendContactFormEmails(contact: Contact): Promise<void> {
  const YOUR_EMAIL = 'shivam@metagrow.com'; // Your email address
  const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@metagrow.com'; // Your verified sender email
  
  // Email to you (the business owner)
  const businessEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #FF6B6B;">New Contact Form Submission</h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Contact Details:</h3>
        <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>
        <p><strong>Service Interest:</strong> ${contact.service || 'Not specified'}</p>
        <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
      </div>
      <div style="background: #fff; padding: 20px; border-left: 4px solid #FF6B6B; margin: 20px 0;">
        <h3 style="margin-top: 0;">Message:</h3>
        <p style="line-height: 1.6;">${contact.message}</p>
      </div>
      <p style="color: #666; font-size: 14px;">
        Reply directly to this email or contact them at ${contact.email}
      </p>
    </div>
  `;

  // Auto-reply email to the person who submitted the form
  const autoReplyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0;">Thank You for Contacting Me!</h1>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p>Dear ${contact.firstName},</p>
        
        <p>Thank you for reaching out to me regarding your wealth management needs. I have received your inquiry and will get back to you within 24 hours.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #FF6B6B; margin-top: 0;">Your Submission Summary:</h3>
          <p><strong>Service Interest:</strong> ${contact.service || 'General Inquiry'}</p>
          <p><strong>Message:</strong> ${contact.message}</p>
        </div>
        
        <p>In the meantime, feel free to:</p>
        <ul style="line-height: 1.8;">
          <li>📱 Connect with me on WhatsApp: <a href="https://wa.me/+919876543210">+91 98765 43210</a></li>
          <li>💼 View my LinkedIn profile: <a href="https://linkedin.com/in/shivamtripathi">linkedin.com/in/shivamtripathi</a></li>
          <li>📧 Email me directly: <a href="mailto:shivam@metagrow.com">shivam@metagrow.com</a></li>
        </ul>
        
        <div style="background: linear-gradient(135deg, #FFE3D8 0%, #FFF5F0 100%); padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; color: #FF6B6B; font-weight: bold;">
            🚀 Let's build your financial future together!
          </p>
        </div>
        
        <p>Best regards,<br>
        <strong>Shivam Mani Tripathi</strong><br>
        <em>Wealth Manager | MetaGrow</em></p>
      </div>
    </div>
  `;

  // Send email to business owner
  await sendEmail({
    to: YOUR_EMAIL,
    from: FROM_EMAIL,
    subject: `New Contact Form Submission from ${contact.firstName} ${contact.lastName}`,
    html: businessEmailHtml,
    text: `New contact form submission from ${contact.firstName} ${contact.lastName}\n\nEmail: ${contact.email}\nPhone: ${contact.phone}\nService: ${contact.service || 'Not specified'}\n\nMessage:\n${contact.message}`
  });

  // Send auto-reply to the person who submitted the form
  await sendEmail({
    to: contact.email,
    from: FROM_EMAIL,
    subject: 'Thank you for contacting Shivam Mani Tripathi - MetaGrow',
    html: autoReplyHtml,
    text: `Dear ${contact.firstName},\n\nThank you for reaching out to me regarding your wealth management needs. I have received your inquiry and will get back to you within 24 hours.\n\nYour message: ${contact.message}\n\nFeel free to contact me directly:\nWhatsApp: +91 98765 43210\nEmail: shivam@metagrow.com\n\nBest regards,\nShivam Mani Tripathi\nWealth Manager | MetaGrow`
  });
}