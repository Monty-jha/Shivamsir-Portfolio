import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// In-memory storage for contacts (shared with contacts.ts)
declare global {
  var contacts: any[];
  var currentId: number;
}

// Initialize global variables if they don't exist
if (!global.contacts) {
  global.contacts = [];
  global.currentId = 1;
}

// Contact schema validation
const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Simple email function (will work even without email credentials)
async function sendSimpleEmail(contact: any) {
  try {
    // Log the contact details (this will show in Vercel logs)
    console.log('New contact form submission:', {
      name: `${contact.firstName} ${contact.lastName}`,
      email: contact.email,
      phone: contact.phone,
      service: contact.service,
      message: contact.message,
      timestamp: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('Email logging failed:', error);
    return false;
  }
}

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
    const result = contactSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: result.error.errors 
      });
    }

    // Create contact
    const contact = {
      id: global.currentId++,
      ...result.data,
      createdAt: new Date()
    };
    
    // Store contact
    global.contacts.push(contact);
    
    // Send email notification
    let emailSent = false;
    try {
      emailSent = await sendSimpleEmail(contact);
    } catch (error) {
      console.error("Email sending failed:", error);
    }
    
    res.status(201).json({ 
      message: "Thank you for your message! I will get back to you within 24 hours.",
      contact: { id: contact.id },
      emailSent: emailSent
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ 
      message: "Failed to submit contact form",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
