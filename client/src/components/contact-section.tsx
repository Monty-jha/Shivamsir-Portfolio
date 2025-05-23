import { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaClock, FaCalendar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContact & { consent: boolean }>({
    resolver: zodResolver(
      insertContactSchema.extend({
        consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy")
      })
    ),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      consent: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message,
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertContact & { consent: boolean }) => {
    setIsSubmitting(true);
    const { consent, ...contactData } = data;
    contactMutation.mutate(contactData);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 intersection-observe">
          <div className="inline-block bg-gradient-light px-4 py-2 rounded-full mb-6">
            <span className="text-coral font-semibold">Contact</span>
          </div>
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-6 text-foreground">
            Let's Plan Your Financial Future
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to take control of your finances? Schedule a consultation and let's discuss your financial goals and create a personalized wealth strategy.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="intersection-observe">
            <div className="bg-gradient-light rounded-2xl p-8 mb-8">
              <h3 className="font-inter font-semibold text-xl mb-6 text-foreground">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-coral rounded-lg flex items-center justify-center mr-4">
                    <FaWhatsapp className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">WhatsApp</div>
                    <a href="https://wa.me/+919876543210" className="text-coral hover:text-orange-warm transition-colors" target="_blank" rel="noopener noreferrer">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-coral rounded-lg flex items-center justify-center mr-4">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <a href="mailto:shivam@metagrow.com" className="text-coral hover:text-orange-warm transition-colors">
                      shivam@metagrow.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-coral rounded-lg flex items-center justify-center mr-4">
                    <FaLinkedin className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">LinkedIn</div>
                    <a href="https://linkedin.com/in/shivamtripathi" className="text-coral hover:text-orange-warm transition-colors" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/shivamtripathi
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-coral rounded-lg flex items-center justify-center mr-4">
                    <FaClock className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Office Hours</div>
                    <div className="text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="https://wa.me/+919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 shine-effect animate-pulse-glow"
              >
                <FaWhatsapp className="text-2xl mb-2 mx-auto animate-bounce-soft" />
                <span className="font-medium">Quick Chat</span>
              </a>
              <a 
                href="mailto:shivam@metagrow.com" 
                className="btn-gradient text-white rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 shine-effect"
              >
                <FaCalendar className="text-2xl mb-2 mx-auto animate-bounce-soft" />
                <span className="font-medium">Book Meeting</span>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="intersection-observe">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Interest</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="investment-planning">Investment Planning</SelectItem>
                          <SelectItem value="retirement-planning">Retirement Planning</SelectItem>
                          <SelectItem value="insurance-planning">Insurance Planning</SelectItem>
                          <SelectItem value="tax-planning">Tax Planning</SelectItem>
                          <SelectItem value="goal-planning">Goal-Based Planning</SelectItem>
                          <SelectItem value="wealth-advisory">Wealth Advisory</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4}
                          placeholder="Tell me about your financial goals and how I can help you..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-muted-foreground">
                          I agree to the{" "}
                          <a href="#" className="text-coral hover:text-orange-warm">
                            privacy policy
                          </a>{" "}
                          and consent to being contacted about financial services.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full btn-gradient text-white py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
