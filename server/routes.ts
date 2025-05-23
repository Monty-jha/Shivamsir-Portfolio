import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactFormEmails } from "./emailService";

// Extend session interface for admin authentication
declare module 'express-session' {
  interface SessionData {
    adminAuthenticated?: boolean;
  }
}

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

  // Admin login page
  app.get("/admin", async (req, res) => {
    // Check if already authenticated
    if (req.session && req.session.adminAuthenticated) {
      return renderAdminDashboard(req, res);
    }

    // Show login form
    const loginHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Admin Login - Shivam Mani Tripathi</title>
          <style>
              body { 
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                  margin: 0; 
                  padding: 0; 
                  background: linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%); 
                  min-height: 100vh; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
              }
              .login-container { 
                  background: white; 
                  padding: 40px; 
                  border-radius: 20px; 
                  box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
                  max-width: 400px; 
                  width: 100%; 
                  text-align: center; 
              }
              .logo { 
                  width: 80px; 
                  height: 80px; 
                  background: linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%); 
                  border-radius: 50%; 
                  margin: 0 auto 20px; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  color: white; 
                  font-weight: bold; 
                  font-size: 24px; 
              }
              h1 { color: #2c3e50; margin-bottom: 30px; font-weight: 300; }
              .form-group { margin-bottom: 20px; text-align: left; }
              label { display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500; }
              input { 
                  width: 100%; 
                  padding: 12px; 
                  border: 2px solid #e9ecef; 
                  border-radius: 8px; 
                  font-size: 16px; 
                  box-sizing: border-box; 
                  transition: border-color 0.3s; 
              }
              input:focus { 
                  outline: none; 
                  border-color: #FF6B6B; 
              }
              .login-btn { 
                  width: 100%; 
                  padding: 12px; 
                  background: linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%); 
                  color: white; 
                  border: none; 
                  border-radius: 8px; 
                  font-size: 16px; 
                  font-weight: 600; 
                  cursor: pointer; 
                  transition: transform 0.2s; 
              }
              .login-btn:hover { transform: translateY(-2px); }
              .error { 
                  color: #e74c3c; 
                  margin-top: 10px; 
                  padding: 10px; 
                  background: #fdf2f2; 
                  border-radius: 8px; 
                  display: none; 
              }
          </style>
      </head>
      <body>
          <div class="login-container">
              <div class="logo">SM</div>
              <h1>Admin Dashboard Login</h1>
              <form id="loginForm" method="POST" action="/admin/login">
                  <div class="form-group">
                      <label for="username">Username (Email)</label>
                      <input type="email" id="username" name="username" required>
                  </div>
                  <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" id="password" name="password" required>
                  </div>
                  <button type="submit" class="login-btn">🔐 Secure Login</button>
                  <div id="error" class="error"></div>
              </form>
          </div>
          
          <script>
              document.getElementById('loginForm').onsubmit = async function(e) {
                  e.preventDefault();
                  const formData = new FormData(this);
                  const response = await fetch('/admin/login', {
                      method: 'POST',
                      body: formData
                  });
                  
                  if (response.ok) {
                      window.location.reload();
                  } else {
                      const error = document.getElementById('error');
                      error.textContent = 'Invalid credentials. Please try again.';
                      error.style.display = 'block';
                  }
              };
          </script>
      </body>
      </html>
    `;
    res.send(loginHtml);
  });

  // Admin login handler
  app.post("/admin/login", async (req, res) => {
    const { username, password } = req.body;
    
    // Check credentials
    if (username === 'shivam@metagrow.com' && password === 'Adminshivam@9554') {
      req.session.adminAuthenticated = true;
      res.redirect('/admin');
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  // Admin logout
  app.post("/admin/logout", (req, res) => {
    req.session.adminAuthenticated = false;
    res.redirect('/admin');
  });

  // Admin dashboard function
  async function renderAdminDashboard(req: any, res: any) {
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
                .header { background: linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
                .header h1 { margin: 0; }
                .logout-btn { background: rgba(255,255,255,0.2); color: white; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer; }
                .logout-btn:hover { background: rgba(255,255,255,0.3); }
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
                    <div>
                        <h1>📧 Contact Form Submissions</h1>
                        <p style="margin: 5px 0 0;">Shivam Mani Tripathi - Wealth Manager Dashboard</p>
                    </div>
                    <form method="POST" action="/admin/logout" style="margin: 0;">
                        <button type="submit" class="logout-btn">🚪 Logout</button>
                    </form>
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
  }

  const httpServer = createServer(app);
  return httpServer;
}
