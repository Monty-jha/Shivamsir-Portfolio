import { 
  FaChartLine, 
  FaPiggyBank, 
  FaShieldAlt, 
  FaCalculator, 
  FaHome, 
  FaHandshake,
  FaCheck 
} from "react-icons/fa";

export default function ServicesSection() {
  const services = [
    {
      icon: FaChartLine,
      title: "Investment Planning",
      description: "Strategic portfolio management with diversified investment options tailored to your risk profile and financial goals.",
      features: ["Equity & Debt Funds", "Portfolio Rebalancing", "Risk Assessment"]
    },
    {
      icon: FaPiggyBank,
      title: "Retirement Planning",
      description: "Secure your future with comprehensive retirement strategies that ensure financial independence and lifestyle maintenance.",
      features: ["NPS & EPF Optimization", "Retirement Corpus Planning", "Pension Schemes"]
    },
    {
      icon: FaShieldAlt,
      title: "Insurance Planning",
      description: "Protect your family's financial future with comprehensive insurance solutions and risk management strategies.",
      features: ["Life & Health Insurance", "Term Plans", "Coverage Analysis"]
    },
    {
      icon: FaCalculator,
      title: "Tax Planning",
      description: "Optimize your tax liability with smart investment choices and strategic financial planning under various tax regimes.",
      features: ["Section 80C Optimization", "LTCG Planning", "Tax-Saving Instruments"]
    },
    {
      icon: FaHome,
      title: "Goal-Based Planning",
      description: "Achieve your life goals with systematic investment plans designed for home buying, children's education, and more.",
      features: ["Education Planning", "Home Loan Planning", "SIP Strategies"]
    },
    {
      icon: FaHandshake,
      title: "Wealth Advisory",
      description: "Personalized wealth management advice with regular portfolio reviews and market insights for informed decisions.",
      features: ["Market Analysis", "Regular Reviews", "Strategy Updates"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 intersection-observe">
          <div className="inline-block bg-white px-4 py-2 rounded-full mb-6">
            <span className="text-coral font-semibold">Services</span>
          </div>
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-6 text-foreground">
            Comprehensive Wealth Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From investment planning to retirement strategies, I offer a full suite of financial services designed to grow and protect your wealth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg card-hover intersection-observe">
              <div className="w-16 h-16 bg-gradient-coral rounded-xl flex items-center justify-center mb-6">
                <service.icon className="text-white text-2xl" />
              </div>
              <h3 className="font-inter font-semibold text-xl mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <FaCheck className="text-coral mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
