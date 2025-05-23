import { FaCalendar, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

export default function InsightsSection() {
  const [email, setEmail] = useState("");

  const insights = [
    {
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      date: "December 15, 2024",
      category: "Market Analysis",
      title: "Q4 2024 Market Outlook: Opportunities in Emerging Sectors",
      excerpt: "Analysis of the current market trends and potential investment opportunities in technology and healthcare sectors for the coming quarter."
    },
    {
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      date: "December 10, 2024",
      category: "Tax Planning",
      title: "Year-End Tax Saving Strategies for 2024",
      excerpt: "Essential tax-saving tips and investment options to maximize your deductions before the financial year ends."
    },
    {
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      date: "December 5, 2024",
      category: "Investment Strategy",
      title: "SIP vs Lump Sum: Which Investment Strategy Works Best?",
      excerpt: "A comprehensive comparison of systematic investment plans versus lump sum investments in different market conditions."
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for subscribing! You'll receive weekly market updates.");
      setEmail("");
    }
  };

  return (
    <section id="insights" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 intersection-observe">
          <div className="inline-block bg-white px-4 py-2 rounded-full mb-6">
            <span className="text-coral font-semibold">Insights</span>
          </div>
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-6 text-foreground">
            Financial Insights & Market Updates
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest market trends, investment strategies, and financial planning tips to make better decisions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover intersection-observe">
              <img 
                src={insight.image} 
                alt={insight.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <FaCalendar className="mr-2" />
                  <span>{insight.date}</span>
                  <span className="mx-2">•</span>
                  <span className="text-coral">{insight.category}</span>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3 hover:text-coral transition-colors duration-300">
                  {insight.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {insight.excerpt}
                </p>
                <button className="text-coral hover:text-orange-warm font-medium inline-flex items-center">
                  Read More <FaArrowRight className="ml-2" />
                </button>
              </div>
            </article>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 text-center intersection-observe">
          <div className="bg-gradient-coral rounded-2xl p-8 md:p-12 text-white">
            <h3 className="font-inter font-bold text-2xl md:text-3xl mb-4">
              Stay Updated with Market Insights
            </h3>
            <p className="text-lg mb-8 text-white/90">
              Get weekly market updates and investment tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-white" 
              />
              <button 
                type="submit"
                className="bg-white text-coral hover:bg-coral-light transition-all duration-300 px-8 py-3 rounded-lg font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
