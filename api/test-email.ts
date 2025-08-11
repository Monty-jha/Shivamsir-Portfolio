import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    
    const config = {
      emailUser: emailUser ? 'Set' : 'Not Set',
      emailPass: emailPass ? 'Set' : 'Not Set',
      nodeEnv: process.env.NODE_ENV || 'Not Set',
      vercelEnv: process.env.VERCEL_ENV || 'Not Set'
    };

    res.json({
      success: true,
      message: 'Email configuration check',
      config,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({ 
      message: "Failed to check email configuration",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
