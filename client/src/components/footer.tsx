import { FaWhatsapp, FaEnvelope, FaLinkedin, FaPhone, FaClock } from "react-icons/fa";
import logoPath from "@assets/Black White Simple Monochrome Initial Name Logo (2).png";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logoPath} 
                alt="Shivam Mani Tripathi Logo" 
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <div className="font-inter font-semibold text-lg">Shivam Mani Tripathi</div>
                <div className="text-sm text-gray-400">Wealth Manager</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Professional wealth management services with MetaGrow. Building your financial future with expertise and trust.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/+919876543210" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="text-xl" />
              </a>
              <a href="mailto:shivam@metagrow.com" className="text-gray-400 hover:text-white transition-colors">
                <FaEnvelope className="text-xl" />
              </a>
              <a href="https://linkedin.com/in/shivamtripathi" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-inter font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Investment Planning</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Retirement Planning</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Insurance Planning</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Tax Planning</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Goal-Based Planning</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Wealth Advisory</button></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-inter font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About Me</button></li>
              <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition-colors">Testimonials</button></li>
              <li><button onClick={() => scrollToSection('insights')} className="hover:text-white transition-colors">Market Insights</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-inter font-semibold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center">
                <FaPhone className="mr-3 text-coral" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-coral" />
                <span>shivam@metagrow.com</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-3 text-coral" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Shivam Mani Tripathi. All rights reserved. | Powered by MetaGrow</p>
          <p className="mt-2 text-sm">
            SEBI Registered Investment Advisor | Mutual Fund Distributor | Insurance Agent
          </p>
        </div>
      </div>
    </footer>
  );
}
