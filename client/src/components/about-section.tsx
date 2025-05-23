import shivamPhoto from "@assets/Untitled design (10).png";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="intersection-observe">
            <img 
              src={shivamPhoto} 
              alt="Shivam Mani Tripathi - Professional portrait" 
              className="rounded-2xl shadow-lg w-full" 
            />
          </div>
          
          <div className="intersection-observe">
            <div className="inline-block bg-gradient-light px-4 py-2 rounded-full mb-6">
              <span className="text-coral font-semibold">About Me</span>
            </div>
            
            <h2 className="font-inter font-bold text-3xl md:text-4xl mb-6 text-foreground">
              Your Trusted Financial Partner
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 8 years of experience in wealth management and financial planning, I specialize in creating personalized investment strategies that align with your life goals and risk tolerance.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At MetaGrow, I combine cutting-edge financial technology with time-tested investment principles to deliver exceptional results for my clients. My approach focuses on long-term wealth building, tax optimization, and comprehensive financial planning.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="font-inter font-bold text-2xl text-coral mb-2">150+</div>
                <div className="text-muted-foreground text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="font-inter font-bold text-2xl text-coral mb-2">₹50Cr+</div>
                <div className="text-muted-foreground text-sm">Assets Managed</div>
              </div>
              <div className="text-center">
                <div className="font-inter font-bold text-2xl text-coral mb-2">8+</div>
                <div className="text-muted-foreground text-sm">Years Experience</div>
              </div>
            </div>
            
            {/* Certifications */}
            <div className="flex flex-wrap gap-3">
              <span className="bg-coral-light text-coral px-3 py-1 rounded-full text-sm font-medium">CFP Certified</span>
              <span className="bg-coral-light text-coral px-3 py-1 rounded-full text-sm font-medium">SEBI Registered</span>
              <span className="bg-coral-light text-coral px-3 py-1 rounded-full text-sm font-medium">MetaGrow Partner</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
