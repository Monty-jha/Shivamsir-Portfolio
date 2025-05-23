import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactFormEmails } from "./emailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
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
  });

  // Get contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Admin dashboard to view all queries
  app.get("/admin", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Contact Form Submissions - Admin Dashboard</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
                .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
                .header { background: linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
                .contact-card { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px; background: #f9f9f9; }
                .contact-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
                .contact-name { font-weight: bold; font-size: 18px; color: #FF6B6B; }
                .contact-date { color: #666; font-size: 14px; }
                .contact-details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0; }
                .message-box { background: white; padding: 15px; border-left: 4px solid #FF6B6B; margin: 10px 0; }
                .no-contacts { text-align: center; color: #666; padding: 40px; }
                .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
                .stat-card { background: linear-gradient(135deg, #FFE3D8 0%, #FFF5F0 100%); padding: 15px; border-radius: 8px; text-align: center; }
                .stat-number { font-size: 24px; font-weight: bold; color: #FF6B6B; }
                .refresh-btn { background: #FF6B6B; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 20px; }
                .refresh-btn:hover { background: #FF8C42; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📧 Contact Form Submissions</h1>
                    <p>Shivam Mani Tripathi - Wealth Manager Dashboard</p>
                </div>
                
                <button class="refresh-btn" onclick="location.reload()">🔄 Refresh</button>
                
                <div class="stats">
                    <div class="stat-card">
                        <div class="stat-number">${contacts.length}</div>
                        <div>Total Submissions</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${contacts.filter(c => {
                            const today = new Date();
                            const contactDate = new Date(c.createdAt);
                            return contactDate.toDateString() === today.toDateString();
                        }).length}</div>
                        <div>Today's Submissions</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${contacts.filter(c => c.service).length}</div>
                        <div>With Service Interest</div>
                    </div>
                </div>

                ${contacts.length === 0 ? 
                    '<div class="no-contacts">No contact form submissions yet. 📝</div>' :
                    contacts.map(contact => `
                        <div class="contact-card">
                            <div class="contact-header">
                                <div class="contact-name">${contact.firstName} ${contact.lastName}</div>
                                <div class="contact-date">${new Date(contact.createdAt).toLocaleString()}</div>
                            </div>
                            <div class="contact-details">
                                <div><strong>📧 Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></div>
                                <div><strong>📱 Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></div>
                                <div><strong>🎯 Service:</strong> ${contact.service || 'Not specified'}</div>
                                <div><strong>🆔 ID:</strong> #${contact.id}</div>
                            </div>
                            <div class="message-box">
                                <strong>💬 Message:</strong><br>
                                ${contact.message}
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        </body>
        </html>
      `;
      res.send(html);
    } catch (error) {
      console.error("Admin dashboard error:", error);
      res.status(500).send("Error loading admin dashboard");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
