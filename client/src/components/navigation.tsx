import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/attached_assets/Black White Simple Monochrome Initial Name Logo (2).png" 
              alt="Shivam Mani Tripathi Logo" 
              className="w-10 h-10 rounded-lg"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-coral transition-colors duration-300">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-coral transition-colors duration-300">About</button>
            <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-coral transition-colors duration-300">Services</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-foreground hover:text-coral transition-colors duration-300">Testimonials</button>
            <button onClick={() => scrollToSection('insights')} className="text-foreground hover:text-coral transition-colors duration-300">Insights</button>
            <button onClick={() => scrollToSection('contact')} className="btn-gradient text-white px-6 py-2 rounded-lg font-medium">Contact</button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left text-foreground hover:text-coral transition-colors duration-300">Home</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left text-foreground hover:text-coral transition-colors duration-300">About</button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left text-foreground hover:text-coral transition-colors duration-300">Services</button>
            <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-foreground hover:text-coral transition-colors duration-300">Testimonials</button>
            <button onClick={() => scrollToSection('insights')} className="block w-full text-left text-foreground hover:text-coral transition-colors duration-300">Insights</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full btn-gradient text-white px-6 py-2 rounded-lg font-medium text-center">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
}
