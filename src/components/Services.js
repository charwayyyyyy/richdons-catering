import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Services = () => {
  const sectionRef = useRef();
  const servicesGridRef = useRef();

  const services = [
    {
      id: 1,
      title: 'Traditional Wedding Catering',
      description: 'Make your special day unforgettable with our exquisite wedding catering services featuring authentic Ghanaian dishes like Jollof Rice, Waakye, and Kelewele.',
      icon: './assets/icons/star.png',
      image: './assets/images/jollof.jpeg',
      features: ['Custom Ghanaian Menu', 'Professional Service Staff', 'Traditional Presentation', 'Dietary Accommodations'],
      price: 'From $50/person',
      popular: true
    },
    {
      id: 2,
      title: 'Corporate Events',
      description: 'Impress your clients and colleagues with our professional corporate catering services featuring a fusion of Ghanaian and international cuisine.',
      icon: './assets/icons/person.png',
      image: './assets/images/bouffet.jpeg',
      features: ['Ghanaian Breakfast & Lunch', 'Meeting Room Setup', 'Punctual Delivery', 'Professional Presentation'],
      price: 'From $25/person',
      popular: false
    },
    {
      id: 3,
      title: 'Private Parties',
      description: 'Celebrate birthdays, anniversaries, and special occasions with our personalized Ghanaian feast catering for an authentic cultural experience.',
      icon: './assets/icons/home.png',
      image: './assets/images/kelewele.jpeg',
      features: ['Customizable Ghanaian Menu', 'Home Delivery', 'Setup & Cleanup', 'Entertainment Coordination'],
      price: 'From $35/person',
      popular: false
    },
    {
      id: 4,
      title: 'Cultural Festivals',
      description: 'Authentic Ghanaian cultural events with traditional music, dance, and cuisine for an immersive West African experience.',
      icon: './assets/icons/star.png',
      image: './assets/images/banku.jpeg',
      features: ['Traditional Ghanaian Recipes', 'Cultural Entertainment', 'Authentic Decorations', 'Educational Experience'],
      price: 'From $40/person',
      popular: true
    },
    {
      id: 5,
      title: 'Ghanaian Meal Prep',
      description: 'Weekly meal preparation services with healthy, authentic Ghanaian meals like Ampesi, Kontomire Stew, and Gob3 delivered fresh to your doorstep.',
      icon: './assets/icons/clock.png',
      image: './assets/images/ampesi.jpeg',
      features: ['Weekly Ghanaian Meal Plans', 'Nutritious Options', 'Fresh Local Ingredients', 'Convenient Delivery'],
      price: 'From $15/meal',
      popular: false
    },
    {
      id: 6,
      title: 'Ghanaian Cooking Classes',
      description: 'Learn to cook authentic Ghanaian dishes like Jollof Rice, Banku & Tilapia, and Kelewele with our expert Ghanaian chefs in hands-on workshops.',
      icon: './assets/icons/pencil.png',
      image: './assets/images/angwamo.jpeg',
      features: ['Expert Ghanaian Chefs', 'Hands-on Learning', 'Traditional Recipe Cards', 'Small Group Sessions'],
      price: 'From $75/class',
      popular: false
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Cultural Consultation',
      description: 'We discuss your event details and introduce you to Ghanaian culinary traditions',
      icon: './assets/icons/phone.png'
    },
    {
      step: '02',
      title: 'Authentic Menu Planning',
      description: 'Custom Ghanaian menu creation based on regional preferences and dietary needs',
      icon: './assets/icons/pencil.png'
    },
    {
      step: '03',
      title: 'Traditional Preparation',
      description: 'Fresh local ingredients sourced and meals prepared with authentic Ghanaian techniques',
      icon: './assets/icons/check.png'
    },
    {
      step: '04',
      title: 'Cultural Service',
      description: 'Professional delivery with traditional Ghanaian hospitality on your special day',
      icon: './assets/icons/star.png'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    
    // Animate section header
    gsap.fromTo('.services-header',
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

    // Animate service cards
    gsap.fromTo('.service-card',
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesGridRef.current,
          start: 'top 80%'
        }
      }
    );

    // Animate process steps
    gsap.fromTo('.process-step',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.process-container',
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-gradient-to-br from-ghana-gold/5 via-white to-ghana-green/5">
      <div className="container-custom">
        {/* Section Header */}
        <div className="services-header text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
            Our Ghanaian <span className="text-gradient">Catering Services</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-ghana-red to-ghana-gold mx-auto mb-6"></div>
          <p className="text-xl text-earth-medium max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we provide exceptional 
            authentic Ghanaian catering services that bring the rich flavors and traditions 
            of West African cuisine to your special events.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card bg-gradient-to-br from-white via-ghana-gold/5 to-white rounded-2xl shadow-lg overflow-hidden card-hover group relative border-2 border-ghana-gold/20"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-10 bg-ghana-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Popular Service
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-ghana-gold to-ghana-red rounded-full flex items-center justify-center shadow-lg border border-white/30">
                  <img src={service.icon} alt={service.title} className="w-6 h-6" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-earth-dark mb-3 group-hover:text-ghana-red transition-colors duration-300 font-ghana">
                  {service.title}
                </h3>
                <p className="text-earth-medium mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-earth-medium">
                      <div className="w-5 h-5 bg-ghana-gold/20 rounded-full flex items-center justify-center mr-2">
                        <img src="./assets/icons/check.png" alt="Check" className="w-3 h-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gradient">
                    {service.price}
                  </div>
                  <button className="bg-gradient-to-r from-ghana-red to-ghana-gold text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/20">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="process-container bg-gradient-to-r from-ghana-green to-earth-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Background food images */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-5">
            <img src="./assets/images/banku.jpeg" alt="Banku" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 w-40 h-40 opacity-5">
            <img src="./assets/images/jollof.jpeg" alt="Jollof Rice" className="w-full h-full object-cover" />
          </div>
          
          <div className="text-center mb-12 relative z-10">
            <h3 className="text-4xl font-bold mb-4">Our Ghanaian Catering Process</h3>
            <div className="w-32 h-1 bg-ghana-gold mx-auto mb-6"></div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Simple, authentic, and professional - here's how we bring the taste of Ghana to your event
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-ghana-gold to-ghana-red rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-white/20">
                    <img src={step.icon} alt={step.title} className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-ghana-red rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md border border-white/20">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3 text-ghana-gold">{step.title}</h4>
                <p className="opacity-90 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-white via-ghana-gold/5 to-white p-8 rounded-3xl shadow-lg border-2 border-ghana-gold/20 relative overflow-hidden">
            {/* Background food images */}
            <div className="absolute -top-10 -left-10 w-32 h-32 opacity-10 rotate-12">
              <img src="./assets/images/jollof.jpeg" alt="Jollof Rice" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 opacity-10 -rotate-12">
              <img src="./assets/images/kelewele.jpeg" alt="Kelewele" className="w-full h-full object-cover rounded-full" />
            </div>
            
            <h3 className="text-3xl font-bold text-earth-dark mb-4 relative z-10">
              Ready for a Taste of Ghana?
            </h3>
            <p className="text-xl text-earth-medium mb-6 relative z-10">
              Get a personalized quote for your authentic Ghanaian catering experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button className="bg-gradient-to-r from-ghana-red to-ghana-gold text-white font-bold text-lg px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/20">
                Get Free Quote
              </button>
              <button className="bg-gradient-to-r from-ghana-green to-earth-dark text-white font-bold text-lg px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/20">
                View Ghanaian Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;