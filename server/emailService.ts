import nodemailer from 'nodemailer';
import type { Contact } from '@shared/schema';

// Create a Vercel-compatible email transporter with better error handling
const createTransporter = () => {
  // Check if we have email credentials
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  if (!emailUser || !emailPass) {
    console.warn('Email credentials not configured. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    },
    // Add timeout and connection settings for serverless
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
};

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email transporter not available');
      return false;
    }

    const mailOptions = {
      from: `"Shivam Mani Tripathi - MetaGrow" <${params.from}>`,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${params.to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

export async function sendContactFormEmails(contact: Contact): Promise<void> {
  const YOUR_EMAIL = 'shivam@metagrow.com'; // Your email address
  const FROM_EMAIL = process.env.EMAIL_USER || 'shivam@metagrow.com'; // Your email address
  
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

  // Auto-reply email to the person who submitted the form - PREMIUM DESIGN
  const autoReplyHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Shivam Mani Tripathi</title>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 650px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            
            <!-- Header with Logo and Gradient -->
            <div style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%); padding: 40px 30px; text-align: center; position: relative;">
                <div style="background: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                    <div style="width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <span style="color: #FF6B6B; font-weight: bold; font-size: 18px;">SM</span>
                    </div>
                </div>
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 1px;">Thank You, ${contact.firstName}!</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your wealth management inquiry has been received</p>
                
                <!-- Floating decorative elements -->
                <div style="position: absolute; top: 20px; right: 30px; width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.6;"></div>
                <div style="position: absolute; bottom: 30px; left: 40px; width: 25px; height: 25px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.4;"></div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%); color: white; padding: 8px 20px; border-radius: 25px; font-size: 14px; font-weight: 500;">
                        ✓ Message Received Successfully
                    </div>
                </div>
                
                <p style="color: #2c3e50; line-height: 1.8; font-size: 16px; margin-bottom: 25px;">
                    Thank you for reaching out to me regarding your wealth management needs. I truly appreciate your trust and will personally review your inquiry to provide you with the best financial guidance.
                </p>
                
                <!-- Submission Summary Card -->
                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%); border: 1px solid #e9ecef; border-radius: 15px; padding: 25px; margin: 25px 0; box-shadow: 0 8px 25px rgba(0,0,0,0.05);">
                    <h3 style="color: #FF6B6B; margin: 0 0 15px; font-size: 18px; font-weight: 600;">📋 Your Submission Summary</h3>
                    <div style="display: grid; gap: 12px;">
                        <div style="display: flex; align-items: center; padding: 8px 0;">
                            <span style="background: #FF6B6B; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 12px;">🎯</span>
                            <div>
                                <strong style="color: #2c3e50;">Service Interest:</strong>
                                <span style="color: #6c757d; margin-left: 8px;">${contact.service || 'General Wealth Management Inquiry'}</span>
                            </div>
                        </div>
                        <div style="background: #fff; padding: 15px; border-radius: 10px; border-left: 4px solid #FF6B6B;">
                            <strong style="color: #2c3e50; display: block; margin-bottom: 8px;">💬 Your Message:</strong>
                            <p style="color: #6c757d; margin: 0; line-height: 1.6; font-style: italic;">"${contact.message}"</p>
                        </div>
                    </div>
                </div>
                
                <!-- Response Timeline -->
                <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f1f8e9 100%); border-radius: 15px; padding: 20px; margin: 25px 0; text-align: center;">
                    <div style="background: #4caf50; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 18px;">⏰</div>
                    <h4 style="color: #2c3e50; margin: 0 0 10px; font-size: 16px;">Expected Response Time</h4>
                    <p style="color: #6c757d; margin: 0; font-size: 14px;">I will personally respond to your inquiry within <strong style="color: #4caf50;">24 hours</strong></p>
                </div>
                
                <!-- Quick Contact Options -->
                <div style="margin: 30px 0;">
                    <h4 style="color: #2c3e50; text-align: center; margin-bottom: 20px; font-size: 18px;">🚀 Connect With Me Immediately</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <a href="https://wa.me/+918299559257" style="display: block; background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); color: white; text-decoration: none; padding: 15px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);">
                            <div style="font-size: 20px; margin-bottom: 5px;">📱</div>
                            <div style="font-weight: 600; font-size: 14px;">WhatsApp Chat</div>
                            <div style="font-size: 12px; opacity: 0.9;">+91 8299559257</div>
                        </a>
                        <a href="mailto:shivam@metagrow.com" style="display: block; background: linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%); color: white; text-decoration: none; padding: 15px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);">
                            <div style="font-size: 20px; margin-bottom: 5px;">📧</div>
                            <div style="font-weight: 600; font-size: 14px;">Direct Email</div>
                            <div style="font-size: 12px; opacity: 0.9;">shivam@metagrow.com</div>
                        </a>
                    </div>
                    <div style="text-align: center; margin-top: 15px;">
                        <a href="https://linkedin.com/in/shivamtripathi" style="display: inline-block; background: #0077b5; color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-size: 14px; font-weight: 500; box-shadow: 0 4px 15px rgba(0, 119, 181, 0.3);">
                            💼 Connect on LinkedIn
                        </a>
                    </div>
                </div>
                
                <!-- Services Preview -->
                <div style="background: linear-gradient(135deg, #FFE3D8 0%, #FFF5F0 100%); border-radius: 15px; padding: 25px; margin: 25px 0; text-align: center;">
                    <h4 style="color: #FF6B6B; margin: 0 0 15px; font-size: 18px;">🎯 My Expertise Areas</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-top: 15px;">
                        <div style="padding: 8px; font-size: 13px; color: #FF6B6B; font-weight: 500;">📈 Investment Planning</div>
                        <div style="padding: 8px; font-size: 13px; color: #FF6B6B; font-weight: 500;">🏦 Retirement Planning</div>
                        <div style="padding: 8px; font-size: 13px; color: #FF6B6B; font-weight: 500;">🛡️ Insurance Planning</div>
                        <div style="padding: 8px; font-size: 13px; color: #FF6B6B; font-weight: 500;">💰 Tax Optimization</div>
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #2c3e50; padding: 25px 30px; text-align: center;">
                <div style="color: white; font-size: 18px; font-weight: 600; margin-bottom: 8px;">Shivam Mani Tripathi</div>
                <div style="color: #bdc3c7; font-size: 14px; margin-bottom: 15px;">Certified Wealth Manager | MetaGrow Partner</div>
                <div style="color: #95a5a6; font-size: 12px; line-height: 1.5;">
                    SEBI Registered Investment Advisor | Mutual Fund Distributor<br>
                    Building Financial Futures Since 2016
                </div>
            </div>
        </div>
        
        <!-- Footer Note -->
        <div style="text-align: center; padding: 20px; color: #6c757d; font-size: 12px;">
            This is an automated response. Your message is important to us and will receive a personal reply soon.
        </div>
    </body>
    </html>
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