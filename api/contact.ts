import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertContactSchema } from '../shared/schema';
import { sendContactFormEmails } from '../server/emailService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = insertContactSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: result.error.errors 
      });
    }

    const contact = await storage.createContact(result.data);
    
    // Send email notifications (if SendGrid is configured)
    try {
      await sendContactFormEmails(contact);
    } catch (error) {
      console.error("Email sending failed:", error);
      // Don't fail the request if email fails
    }
    
    res.status(201).json({ 
      message: "Thank you for your message! I will get back to you within 24 hours.",
      contact: { id: contact.id }
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Failed to submit contact form" });
  }
}
