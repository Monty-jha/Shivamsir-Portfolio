import { FaWhatsapp, FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function HeroSection() {
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
    <section id="home" className="hero-gradient min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-slide-up">
            <div className="mb-6">
              <h1 className="font-inter font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-2">
                <span className="text-coral-light">Shivam Mani Tripathi</span>
              </h1>
              <p className="text-xl text-white/90 font-semibold mb-4">Wealth Manager at MetaGrow</p>
            </div>
            <p className="text-xl mb-8 text-white/90 font-lato leading-relaxed">
              Expert wealth management services tailored to your financial goals. With MetaGrow's innovative approach and my personalized strategies, let's create your path to financial freedom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-white text-coral hover:bg-coral-light transition-all duration-300 px-8 py-4 rounded-lg font-semibold text-center transform hover:scale-105 shine-effect animate-pulse-glow"
              >
                Start Your Journey
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="border-2 border-white text-white hover:bg-white hover:text-coral transition-all duration-300 px-8 py-4 rounded-lg font-semibold text-center hover:scale-105 transform"
              >
                Explore Services
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-6 mt-8">
              <a href="https://wa.me/+918299559257" className="text-white/80 hover:text-white transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="text-2xl" />
              </a>
              <a href="mailto:shivam@metagrow.com" className="text-white/80 hover:text-white transition-colors duration-300">
                <FaEnvelope className="text-2xl" />
              </a>
              <a href="https://linkedin.com/in/shivamtripathi" className="text-white/80 hover:text-white transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
          
          <div className="lg:flex justify-center animate-float hidden">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600" 
              alt="Professional financial advisor" 
              className="rounded-2xl shadow-2xl w-full max-w-md" 
            />
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full floating-elements hidden lg:block"></div>
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-white/10 rounded-full floating-elements hidden lg:block" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-coral/20 rounded-full floating-elements hidden lg:block" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-orange-warm/20 rounded-full floating-elements hidden lg:block" style={{ animationDelay: '6s' }}></div>
    </section>
  );
}
