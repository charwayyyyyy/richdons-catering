import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { animate, stagger } from 'animejs';
import { counterAnimation } from '../utils/animations';

const BudgetCalculator = () => {
  // State for form inputs
  const [guestCount, setGuestCount] = useState(50);
  const [eventType, setEventType] = useState('wedding');
  const [menuType, setMenuType] = useState('standard');
  const [additionalServices, setAdditionalServices] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // Refs for animations
  const calculatorRef = useRef(null);
  const resultsRef = useRef(null);
  const totalBudgetRef = useRef(null);
  const formRef = useRef(null);
  
  // Pricing data
  const pricing = {
    basePerGuest: {
      wedding: 85,
      corporate: 65,
      party: 55,
      festival: 45
    },
    menuMultiplier: {
      basic: 0.8,
      standard: 1,
      premium: 1.3,
      luxury: 1.6
    },
    additionalServices: {
      staffing: 350,
      decoration: 500,
      entertainment: 750,
      transportation: 300,
      photography: 600
    }
  };
  
  // Event type options
  const eventTypes = [
    { value: 'wedding', label: 'Traditional Wedding' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'party', label: 'Private Party' },
    { value: 'festival', label: 'Cultural Festival' }
  ];
  
  // Menu type options
  const menuTypes = [
    { value: 'basic', label: 'Basic Ghanaian Menu' },
    { value: 'standard', label: 'Standard Ghanaian Menu' },
    { value: 'premium', label: 'Premium Ghanaian Menu' },
    { value: 'luxury', label: 'Luxury Ghanaian Menu' }
  ];
  
  // Additional services options
  const serviceOptions = [
    { value: 'staffing', label: 'Professional Staffing' },
    { value: 'decoration', label: 'Ghanaian-themed Decoration' },
    { value: 'entertainment', label: 'Traditional Entertainment' },
    { value: 'transportation', label: 'Food Transportation' },
    { value: 'photography', label: 'Event Photography' }
  ];
  
  // Calculate budget with enhanced animation
  const calculateBudget = () => {
    const basePrice = pricing.basePerGuest[eventType] * guestCount;
    const menuPrice = basePrice * pricing.menuMultiplier[menuType];
    
    const additionalServicesTotal = additionalServices.reduce((total, service) => {
      return total + pricing.additionalServices[service];
    }, 0);
    
    const calculatedTotal = menuPrice + additionalServicesTotal;
    
    // Animate the form transition
    const formElement = formRef.current;
    if (formElement) {
      animate({
        targets: formElement,
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 400,
        easing: 'easeOutQuad',
        complete: () => {
          setTotalBudget(calculatedTotal);
          setShowResults(true);
          
          // Animate the results appearance after state update
          setTimeout(() => {
            const resultsElement = resultsRef.current;
            if (resultsElement) {
              animate({
                targets: resultsElement,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutQuad'
              });
              
              // Animate price breakdown items
              animate({
                targets: '.price-item',
                opacity: [0, 1],
                translateX: [-20, 0],
                delay: stagger(100),
                duration: 500,
                easing: 'easeOutQuad'
              });
              
              // Animate total price
              animate({
                targets: '.total-price',
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 800,
                delay: 300,
                easing: 'easeOutElastic(1, 0.7)'
              });
            }
          }, 100);
        }
      });
    } else {
      setTotalBudget(calculatedTotal);
      setShowResults(true);
    }
  };
  
  // Handle checkbox changes with enhanced feedback
  const handleServiceChange = (service) => {
    // Find the service element for animation
    const serviceElement = document.querySelector(`#service-${service}`);
    
    if (additionalServices.includes(service)) {
      // Removing service animation
      if (serviceElement) {
        anime({
          targets: serviceElement,
          scale: [1, 0.95, 1],
          backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(214,40,40,0.1)', 'rgba(255,255,255,0.05)'],
          borderColor: ['rgba(232,185,35,0.3)', 'rgba(214,40,40,0.3)', 'rgba(255,255,255,0.1)'],
          duration: 400,
          easing: 'easeOutQuad'
        });
      }
      setAdditionalServices(additionalServices.filter(s => s !== service));
    } else {
      // Adding service animation
      if (serviceElement) {
        anime({
          targets: serviceElement,
          scale: [1, 1.05, 1],
          backgroundColor: ['rgba(255,255,255,0.05)', 'rgba(232,185,35,0.2)', 'rgba(255,255,255,0.1)'],
          borderColor: ['rgba(255,255,255,0.1)', 'rgba(232,185,35,0.8)', 'rgba(232,185,35,0.3)'],
          duration: 600,
          easing: 'easeOutElastic(1, 0.7)'
        });
      }
      setAdditionalServices([...additionalServices, service]);
    }
  };
  
  // Reset calculator
  const resetCalculator = () => {
    // Animate transition back to form
    animate({
      targets: resultsRef.current,
      opacity: [1, 0],
      translateY: [0, 20],
      easing: 'easeInExpo',
      duration: 500,
      complete: () => {
        setShowResults(false);
        setGuestCount(50);
        setEventType('wedding');
        setMenuType('standard');
        setAdditionalServices([]);
        
        // Animate form back in
        animate({
          targets: formRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          easing: 'easeOutExpo',
          duration: 500
        });
      }
    });
  };
  
  // Animations when component mounts
  useEffect(() => {
    gsap.from(calculatorRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: calculatorRef.current,
        start: 'top 80%',
      }
    });
  }, []);
  
  // Animation when results are shown
  useEffect(() => {
    if (showResults && totalBudgetRef.current) {
      // Animate form out
      anime({
        targets: formRef.current,
        opacity: [1, 0],
        translateY: [0, -20],
        easing: 'easeInExpo',
        duration: 500
      });
      
      // Animate results in
      anime({
        targets: resultsRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 500,
        delay: 500
      });
      
      // Animate counter
      counterAnimation(totalBudgetRef.current, totalBudget);
    }
  }, [showResults, totalBudget]);

  return (
    <section id="budget-calculator" className="py-20 relative overflow-hidden">
      {/* Background with Ghanaian pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-earth-dark to-earth-medium opacity-95 z-0"></div>
      
      {/* Floating food images */}
      <div className="absolute top-20 right-10 opacity-10 animate-float animation-delay-200">
        <img src="./assets/images/jollof.jpeg" alt="Jollof Rice" className="w-24 h-24 rounded-full" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10 animate-float animation-delay-600">
        <img src="./assets/images/kelewele.jpeg" alt="Kelewele" className="w-20 h-20 rounded-full" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-ghana">Budget Calculator</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Plan your Ghanaian catering budget with our easy-to-use calculator. Get an instant estimate based on your event details and requirements.
          </p>
        </div>
        
        <div 
          ref={calculatorRef}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl"
        >
          {!showResults ? (
            <div ref={formRef} className="space-y-8">
              {/* Guest Count */}
              <div>
                <label className="block text-ghana-gold text-lg font-semibold mb-3">
                  Number of Guests
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-white text-xl font-bold min-w-[60px] text-center">
                    {guestCount}
                  </span>
                </div>
              </div>
              
              {/* Event Type */}
              <div>
                <label className="block text-ghana-gold text-lg font-semibold mb-3">
                  Event Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {eventTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setEventType(type.value)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${eventType === type.value 
                        ? 'bg-gradient-to-r from-ghana-red via-ghana-gold to-ghana-green text-white border-white/20' 
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Menu Type */}
              <div>
                <label className="block text-ghana-gold text-lg font-semibold mb-3">
                  Menu Selection
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {menuTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setMenuType(type.value)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${menuType === type.value 
                        ? 'bg-gradient-to-r from-ghana-red via-ghana-gold to-ghana-green text-white border-white/20' 
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Additional Services */}
              <div>
                <label className="block text-ghana-gold text-lg font-semibold mb-3">
                  Additional Services
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceOptions.map((service) => (
                    <div 
                      id={`service-${service.value}`}
                      key={service.value}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${additionalServices.includes(service.value) 
                        ? 'bg-white/20 border-ghana-gold text-white' 
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                      onClick={() => handleServiceChange(service.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${additionalServices.includes(service.value) 
                          ? 'bg-ghana-gold border-ghana-gold' 
                          : 'border-white/30'}`}
                        >
                          {additionalServices.includes(service.value) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-earth-dark" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span>{service.label}</span>
                      </div>
                      <div className="mt-2 text-ghana-gold font-semibold">
                        ${pricing.additionalServices[service.value]}
                      </div>
                      {additionalServices.includes(service.value) && (
                        <div className="mt-2 text-xs text-ghana-gold/80 italic">
                          Service added to your package
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Calculate Button */}
              <div className="pt-6">
                <button
                  onClick={calculateBudget}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-ghana-red via-ghana-gold to-ghana-green text-earth-dark font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  Calculate My Budget
                </button>
              </div>
            </div>
          ) : (
            <div ref={resultsRef} className="py-8 text-center">
              <h3 className="text-2xl font-bold text-ghana-gold mb-6">Your Estimated Budget</h3>
              
              <div className="mb-8">
                <span className="text-6xl font-bold text-white">$</span>
                <span ref={totalBudgetRef} className="text-6xl font-bold text-white total-price">0</span>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="text-xl font-semibold text-ghana-gold mb-4">Budget Breakdown</h4>
                
                <div className="space-y-3 text-left">
                  <div className="price-item flex justify-between">
                    <span className="text-gray-300">Base Catering ({guestCount} guests)</span>
                    <span className="text-white font-semibold">
                      ${(pricing.basePerGuest[eventType] * guestCount).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="price-item flex justify-between">
                    <span className="text-gray-300">Menu Selection ({menuTypes.find(m => m.value === menuType)?.label})</span>
                    <span className="text-white font-semibold">
                      ${((pricing.basePerGuest[eventType] * guestCount * pricing.menuMultiplier[menuType]) - 
                         (pricing.basePerGuest[eventType] * guestCount)).toFixed(2)}
                    </span>
                  </div>
                  
                  {additionalServices.length > 0 && additionalServices.map(service => (
                    <div key={service} className="price-item flex justify-between">
                      <span className="text-gray-300">{serviceOptions.find(s => s.value === service)?.label}</span>
                      <span className="text-white font-semibold">
                        ${pricing.additionalServices[service].toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetCalculator}
                  className="flex-1 py-3 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Recalculate
                </button>
                
                <button
                  onClick={() => window.location.href = '#contact'}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-ghana-red via-ghana-gold to-ghana-green text-earth-dark font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  Request Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BudgetCalculator;