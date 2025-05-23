import { FaStar } from "react-icons/fa";

export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      text: "Shivam's expertise in financial planning helped us buy our dream home within 3 years. His systematic approach and regular guidance made all the difference.",
      name: "Priya & Rajesh Sharma",
      role: "IT Professionals",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
    },
    {
      rating: 5,
      text: "The retirement planning strategy Shivam created for me gives me complete peace of mind. His knowledge of market trends is exceptional.",
      name: "Amit Agarwal",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
    },
    {
      rating: 5,
      text: "Thanks to Shivam's investment advice, I've seen a 15% annual return on my portfolio. His personalized approach is exactly what I needed.",
      name: "Dr. Meera Patel",
      role: "Healthcare Professional",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
    },
    {
      rating: 5,
      text: "Shivam helped us plan for our daughter's education systematically. We're confident about her future now. Highly recommended!",
      name: "Vikash & Sunita Singh",
      role: "Government Employees",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
    },
    {
      rating: 5,
      text: "As a young professional, Shivam's guidance on SIPs and tax planning has been invaluable. My wealth is growing steadily!",
      name: "Rohit Malhotra",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
    },
    {
      rating: 5,
      text: "Shivam's insurance planning saved us during a medical emergency. His comprehensive approach to financial security is commendable.",
      name: "Mr. & Mrs. Gupta",
      role: "Retired Couple",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 intersection-observe">
          <div className="inline-block bg-gradient-light px-4 py-2 rounded-full mb-6">
            <span className="text-coral font-semibold">Testimonials</span>
          </div>
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-6 text-foreground">
            What My Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real experiences from clients who have achieved their financial goals with my guidance and expertise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-light rounded-2xl p-8 card-hover intersection-observe scale-on-hover shine-effect">
              <div className="flex items-center mb-6">
                <div className="flex text-coral">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              <blockquote className="text-muted-foreground mb-6 italic">
                "{testimonial.text}"
              </blockquote>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} testimonial`} 
                  className="w-12 h-12 rounded-full mr-4" 
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
