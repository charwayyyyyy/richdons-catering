import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animate navbar on load
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element.offsetTop - 80 },
        ease: 'power3.inOut'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About Us', id: 'about' },
    { name: 'Ghanaian Menu', id: 'menu' },
    { name: 'Catering', id: 'services' },
    { name: 'Budget', id: 'budget-calculator' },
    { name: 'Food Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="./assets/images/logo.jpg" 
                alt="RichDons Logo" 
                className="h-14 w-14 object-cover rounded-full border-2 border-ghana-gold shadow-md"
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                <img src="./assets/images/kelewele.jpeg" alt="" className="w-4 h-4 rounded-full" />
              </div>
            </div>
            <div className="text-2xl font-bold">
              <span className={`transition-colors duration-300 ${
                isScrolled ? 'text-ghana-red' : 'text-white'
              }`}>
                Rich
              </span>
              <span className={`transition-colors duration-300 ${
                isScrolled ? 'text-ghana-gold' : 'text-ghana-gold'
              }`}>
                Dons
              </span>
              <div className="text-xs font-medium mt-0.5 ${isScrolled ? 'text-earth-medium' : 'text-white/80'}">
                Authentic Ghanaian Cuisine
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-all duration-300 hover:scale-110 ${
                  isScrolled 
                    ? 'text-earth-dark hover:text-ghana-red' 
                    : 'text-white hover:text-ghana-gold'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </button>
            ))}
            <button className="btn-primary ml-4 flex items-center space-x-2 group">
              <span>Order Ghanaian</span>
              <img 
                src="./assets/icons/bag.png" 
                alt="Order" 
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" 
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-1">
              <div className={`w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-earth-dark' : 'bg-white'
              } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-earth-dark' : 'bg-white'
              } ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-earth-dark' : 'bg-white'
              } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 bg-white/95 backdrop-blur-md rounded-lg mt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-earth-dark hover:text-ghana-red transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
            <div className="px-4">
              <button className="btn-primary w-full flex items-center justify-center space-x-2">
                <span>Order Ghanaian</span>
                <img src="./assets/icons/bag.png" alt="Order" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;