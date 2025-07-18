import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { animate } from 'animejs';
import { textReveal, staggeredList } from '../utils/animations';

const EnhancedContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guestCount: '',
    eventDate: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // Refs for animations
  const formRef = useRef(null);
  const formFieldsRef = useRef(null);
  const successRef = useRef(null);
  
  // Event types
  const eventTypes = [
    'Traditional Wedding',
    'Corporate Event',
    'Private Party',
    'Cultural Festival',
    'Meal Prep Service',
    'Cooking Class',
    'Other'
  ];
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus({ submitted: true, success: false, message: 'Sending your request...' });
    
    // Animate form out
    animate({
      targets: formFieldsRef.current,
      opacity: [1, 0],
      translateY: [0, -20],
      easing: 'easeInExpo',
      duration: 500
    });
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you! Your request has been received. We will contact you shortly to discuss your Ghanaian catering needs.'
      });
      
      // Animate success message in
      animate({
        targets: successRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: 200
      });
    }, 2000);
  };
  
  // Reset form
  const resetForm = () => {
    // Animate success message out
    animate({
      targets: successRef.current,
      opacity: [1, 0],
      translateY: [0, -20],
      easing: 'easeInExpo',
      duration: 500,
      complete: () => {
        setFormStatus({ submitted: false, success: false, message: '' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          guestCount: '',
          eventDate: '',
          message: ''
        });
        
        // Animate form back in
        animate({
          targets: formFieldsRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          easing: 'easeOutExpo',
          duration: 800,
          delay: 200
        });
      }
    });
  };
  
  // Initial animations
  useEffect(() => {
    if (!formRef.current) return;
    
    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 80%',
      }
    });
    
    // Staggered animation for form fields
    const formElements = formFieldsRef.current.querySelectorAll('.form-field');
    staggeredList(formElements, 100);
  }, []);

  return (
    <div 
      ref={formRef}
      className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl"
    >
      {!formStatus.submitted ? (
        <form ref={formFieldsRef} onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl font-bold text-ghana-gold mb-6">Request a Quote</h3>
          
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-ghana-gold text-sm font-semibold mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ghana-gold transition-all duration-300"
                placeholder="Full Name"
              />
            </div>
            
            <div className="form-field">
              <label className="block text-ghana-gold text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ghana-gold transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          {/* Phone and Event Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-ghana-gold text-sm font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ghana-gold transition-all duration-300"
                placeholder="Your Phone Number"
              />
            </div>
            
            <div className="form-field">
              <label className="block text-ghana-gold text-sm font-semibold mb-2">Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ghana-gold transition-all duration-300"
              >
                <option value="" disabled>Select Event Type</option>
                {eventTypes.map((type, index) => (
                  <option key={index} value={type} className="bg-earth-dark text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Guest Count and Event Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-ghana-gold text-sm font-semibold mb-2">Number of Guests</label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ghana-gold transition-all duration-300"
                placeholder="Estimated Guest Count"
              />
            </div>
            
            <div className="form-field">
              <label className="block text-ghana-gold text-sm font-semibold mb-2">Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ghana-gold transition-all duration-300"
              />
            </div>
          </div>
          
          {/* Message */}
          <div className="form-field">
            <label className="block text-ghana-gold text-sm font-semibold mb-2">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ghana-gold transition-all duration-300 resize-none"
              placeholder="Tell us about your event and any specific Ghanaian dishes you'd like..."
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="form-field">
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-gradient-to-r from-ghana-red via-ghana-gold to-ghana-green text-earth-dark font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Send Request
            </button>
          </div>
        </form>
      ) : (
        <div ref={successRef} className="text-center py-10">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-ghana-gold rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-earth-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-ghana-gold mb-4">Thank You!</h3>
          <p className="text-gray-300 mb-8">{formStatus.message}</p>
          
          <button
            onClick={resetForm}
            className="px-8 py-3 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Send Another Request
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedContactForm;