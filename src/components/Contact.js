import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EnhancedContactForm from './EnhancedContactForm';

const Contact = () => {
  const sectionRef = useRef();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guests: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: './assets/icons/phone.png',
      title: 'Call Us',
      details: ['+233 24 123 4567', '+233 20 987 6543'],
      description: 'Available 24/7 for your catering needs'
    },
    {
      icon: './assets/icons/envelope.png',
      title: 'Email Us',
      details: ['info@richdons.com', 'catering@richdons.com'],
      description: 'Get a quote within 24 hours'
    },
    {
      icon: './assets/icons/location.png',
      title: 'Visit Us',
      details: ['Labone', 'Greater Accra, Ghana'],
      description: 'Come taste our authentic cuisine'
    },
    {
      icon: './assets/icons/clock.png',
      title: 'Business Hours',
      details: ['Mon - Fri: 8AM - 8PM', 'Sat - Sun: 9AM - 6PM'],
      description: 'Always ready to serve you'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    
    // Animate section header
    gsap.fromTo('.contact-header',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%'
        }
      }
    );

    // Animate contact cards
    gsap.fromTo('.contact-card',
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 80%'
        }
      }
    );

    // Animate form
    gsap.fromTo(formRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Animate form submission
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Here you would typically send the form data to your backend
        alert('Thank you for your inquiry! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guests: '',
          message: ''
        });
      }
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-gradient-to-br from-ghana-green/10 via-white to-ghana-gold/10">
      <div className="container-custom">
        {/* Section Header */}
        <div className="contact-header text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ghana-red to-ghana-gold mx-auto mb-6"></div>
          <p className="text-xl text-earth-medium max-w-3xl mx-auto leading-relaxed">
            Ready to make your event unforgettable? Contact us today for a personalized 
            catering experience that celebrates authentic Ghanaian flavors.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="contact-grid grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-card bg-white rounded-2xl p-6 shadow-lg card-hover">
                  <div className="w-16 h-16 bg-gradient-to-br from-ghana-red to-warm-orange rounded-xl flex items-center justify-center mb-4">
                    <img src={info.icon} alt={info.title} className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-earth-dark mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-ghana-red font-semibold mb-1">{detail}</p>
                  ))}
                  <p className="text-earth-medium text-sm">{info.description}</p>
                </div>
              ))}
            </div>

            {/* Map and Food Showcase */}
            <div className="bg-gradient-to-br from-ghana-gold/20 to-ghana-green/20 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-5 left-10 w-20 h-20 rounded-full overflow-hidden">
                  <img src="./assets/images/jollof.jpeg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-5 right-10 w-16 h-16 rounded-full overflow-hidden">
                  <img src="./assets/images/kelewele.jpeg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="relative z-10">
                <img src="./assets/images/restaurant.jpg" alt="Our Restaurant" className="w-full h-48 object-cover rounded-xl mb-4 shadow-lg" />
                <h3 className="text-2xl font-bold text-earth-dark mb-2">Visit Our Ghanaian Kitchen</h3>
                <p className="text-earth-medium">Located in the heart of Accra, come experience our authentic Ghanaian cuisine and discuss your catering needs.</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <div className="bg-white p-2 rounded-lg shadow-md inline-flex items-center">
                    <img src="./assets/icons/location.png" alt="Location" className="w-5 h-5 mr-2" />
                    <span className="text-ghana-red font-medium">Labone, Accra</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-md inline-flex items-center">
                    <img src="./assets/icons/clock.png" alt="Hours" className="w-5 h-5 mr-2" />
                    <span className="text-ghana-green font-medium">Open Daily</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div ref={formRef}>
            <EnhancedContactForm />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-ghana-red to-ghana-green rounded-3xl p-8 text-white relative overflow-hidden">
          {/* Background Food Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 left-10 w-20 h-20 rounded-full overflow-hidden">
              <img src="./assets/images/jollof.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-5 right-10 w-16 h-16 rounded-full overflow-hidden">
              <img src="./assets/images/kelewele.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full overflow-hidden">
              <img src="./assets/images/banku.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Ready to Taste Authentic Ghana?</h3>
            <p className="text-xl mb-6 opacity-90">
              Call us now for immediate assistance and a free tasting consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-secondary text-lg px-8 py-3 hover:scale-105 transition-transform duration-300 shadow-lg">
                <img src="./assets/icons/phone.png" alt="Phone" className="inline-block w-5 h-5 mr-2" />
                Call Now
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-lg">
                <img src="./assets/icons/envelope.png" alt="Email" className="inline-block w-5 h-5 mr-2" />
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;