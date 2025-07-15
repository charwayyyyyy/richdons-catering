// Import necessary libraries and components
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Footer component
const Footer = () => {
  // Ref for footer element
  const footerRef = useRef();

  // Data for quick links
  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Menu', href: '#menu' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  // Data for services
  const services = [
    'Wedding Catering',
    'Corporate Events',
    'Private Parties',
    'Cultural Events',
    'Meal Prep Services',
    'Cooking Classes'
  ];

  // Data for social links
  const socialLinks = [
    { name: 'Facebook', icon: './assets/icons/person.png', url: '#' },
    { name: 'Instagram', icon: './assets/icons/star.png', url: '#' },
    { name: 'Twitter', icon: './assets/icons/envelope.png', url: '#' },
    { name: 'WhatsApp', icon: './assets/icons/phone.png', url: '#' }
  ];

  // useEffect for animations
  useEffect(() => {
    const footer = footerRef.current;
    
    // Animate footer sections on scroll
    gsap.fromTo('.footer-section',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%'
        }
      }
    );

    // Animate social icons
    gsap.fromTo('.social-icon',
      { scale: 0, rotation: 180 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 90%'
        }
      }
    );
  }, []);

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element.offsetTop - 80 },
        ease: 'power3.inOut'
      });
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: 0 },
      ease: 'power3.inOut'
    });
  };

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-earth-dark via-ghana-green to-earth-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="footer-section lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="./assets/images/logo.png" 
                  alt="RichDons Logo" 
                  className="h-12 w-12 object-contain"
                />
                <div className="text-2xl font-bold">
                  <span className="text-white">Rich</span>
                  <span className="text-ghana-gold">Dons</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Bringing authentic Ghanaian flavors to your special occasions. 
                Experience the rich culinary heritage of Ghana with our premium catering services.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img src="./assets/icons/phone.png" alt="Phone" className="w-5 h-5" />
                  <span className="text-ghana-gold">+233 24 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img src="./assets/icons/envelope.png" alt="Email" className="w-5 h-5" />
                  <span className="text-ghana-gold">info@richdons.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img src="./assets/icons/location.png" alt="Location" className="w-5 h-5" />
                  <span className="text-ghana-gold">Accra, Ghana</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="text-xl font-bold mb-6 text-ghana-gold">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-ghana-gold transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3 className="text-xl font-bold mb-6 text-ghana-gold">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 hover:text-white transition-colors duration-300">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="footer-section">
              <h3 className="text-xl font-bold mb-6 text-ghana-gold">Stay Connected</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for updates and special offers.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ghana-gold"
                  />
                  <button className="px-4 py-2 bg-ghana-gold text-earth-dark font-semibold rounded-r-lg hover:bg-ghana-gold/90 transition-colors duration-300">
                    <img src="./assets/icons/arrow-right.png" alt="Subscribe" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-links">
                <h4 className="text-lg font-semibold mb-4 text-ghana-gold">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="social-icon w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-ghana-gold hover:scale-110 transition-all duration-300 group"
                    >
                      <img 
                        src={social.icon} 
                        alt={social.name} 
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 RichDons Catering. All rights reserved. | Authentic Ghanaian Cuisine
              </div>
              
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-ghana-gold transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-ghana-gold transition-colors duration-300 text-sm">
                  Terms of Service
                </a>
                <button
                  onClick={scrollToTop}
                  className="bg-ghana-gold text-earth-dark p-2 rounded-full hover:bg-ghana-gold/90 hover:scale-110 transition-all duration-300 group"
                >
                  <img 
                    src="./assets/icons/arrow-right.png" 
                    alt="Back to top" 
                    className="w-4 h-4 transform -rotate-90 group-hover:scale-110 transition-transform duration-300" 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - Ghanaian Food */}
      <div className="absolute top-10 right-10 opacity-10 animate-float animation-delay-200">
        <img src="./assets/images/jollof.jpeg" alt="Jollof Rice" className="w-20 h-20 rounded-full" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10 animate-float animation-delay-600">
        <img src="./assets/images/kelewele.jpeg" alt="Kelewele" className="w-16 h-16 rounded-full" />
      </div>
      <div className="absolute top-40 left-20 opacity-10 animate-float animation-delay-400">
        <img src="./assets/images/banku.jpeg" alt="Banku" className="w-18 h-18 rounded-full" />
      </div>
    </footer>
  );
};

export default Footer;