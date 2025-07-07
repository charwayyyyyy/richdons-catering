import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Services = () => {
  const sectionRef = useRef();
  const servicesGridRef = useRef();

  const services = [
    {
      id: 1,
      title: 'Wedding Catering',
      description: 'Make your special day unforgettable with our exquisite wedding catering services featuring traditional and modern Ghanaian cuisine.',
      icon: './assets/icons/star.png',
      image: './assets/images/success.png',
      features: ['Custom Menu Planning', 'Professional Service Staff', 'Elegant Presentation', 'Dietary Accommodations'],
      price: 'From $50/person',
      popular: true
    },
    {
      id: 2,
      title: 'Corporate Events',
      description: 'Impress your clients and colleagues with our professional corporate catering services for meetings, conferences, and company events.',
      icon: './assets/icons/person.png',
      image: './assets/images/login-graphic.png',
      features: ['Breakfast & Lunch Options', 'Meeting Room Setup', 'Punctual Delivery', 'Professional Presentation'],
      price: 'From $25/person',
      popular: false
    },
    {
      id: 3,
      title: 'Private Parties',
      description: 'Celebrate birthdays, anniversaries, and special occasions with our personalized private party catering services.',
      icon: './assets/icons/home.png',
      image: './assets/images/avatar.png',
      features: ['Customizable Packages', 'Home Delivery', 'Setup & Cleanup', 'Entertainment Coordination'],
      price: 'From $35/person',
      popular: false
    },
    {
      id: 4,
      title: 'Cultural Events',
      description: 'Authentic Ghanaian cultural events with traditional music, dance, and cuisine for an immersive cultural experience.',
      icon: './assets/icons/star.png',
      image: './assets/images/splash-icon.png',
      features: ['Traditional Recipes', 'Cultural Entertainment', 'Authentic Decorations', 'Educational Experience'],
      price: 'From $40/person',
      popular: true
    },
    {
      id: 5,
      title: 'Meal Prep Services',
      description: 'Weekly meal preparation services with healthy, authentic Ghanaian meals delivered fresh to your doorstep.',
      icon: './assets/icons/clock.png',
      image: './assets/images/empty-state.png',
      features: ['Weekly Meal Plans', 'Nutritious Options', 'Fresh Ingredients', 'Convenient Delivery'],
      price: 'From $15/meal',
      popular: false
    },
    {
      id: 6,
      title: 'Cooking Classes',
      description: 'Learn to cook authentic Ghanaian dishes with our expert chefs in hands-on cooking classes and workshops.',
      icon: './assets/icons/pencil.png',
      image: './assets/images/icon.png',
      features: ['Expert Instruction', 'Hands-on Learning', 'Recipe Cards', 'Small Group Sessions'],
      price: 'From $75/class',
      popular: false
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We discuss your event details, preferences, and requirements',
      icon: './assets/icons/phone.png'
    },
    {
      step: '02',
      title: 'Menu Planning',
      description: 'Custom menu creation based on your taste and dietary needs',
      icon: './assets/icons/pencil.png'
    },
    {
      step: '03',
      title: 'Preparation',
      description: 'Fresh ingredients sourced and meals prepared with care',
      icon: './assets/icons/check.png'
    },
    {
      step: '04',
      title: 'Service',
      description: 'Professional delivery and service on your special day',
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
            Our <span className="text-gradient">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ghana-red to-ghana-gold mx-auto mb-6"></div>
          <p className="text-xl text-earth-medium max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we provide exceptional 
            catering services tailored to your unique needs and preferences.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card bg-white rounded-2xl shadow-lg overflow-hidden card-hover group relative"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-10 bg-ghana-red text-white text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <img src={service.icon} alt={service.title} className="w-6 h-6" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-earth-dark mb-3 group-hover:text-ghana-red transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-earth-medium mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-earth-medium">
                      <img src="./assets/icons/check.png" alt="Check" className="w-4 h-4 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gradient">
                    {service.price}
                  </div>
                  <button className="bg-gradient-to-r from-ghana-red to-warm-orange text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="process-container bg-gradient-to-r from-ghana-green to-earth-dark rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Our Process</h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Simple, transparent, and professional - here's how we make your event extraordinary
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-ghana-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src={step.icon} alt={step.title} className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-ghana-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="opacity-90 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-3xl font-bold text-earth-dark mb-4">
              Ready to Plan Your Event?
            </h3>
            <p className="text-xl text-earth-medium mb-6">
              Get a personalized quote for your special occasion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-3">
                Get Free Quote
              </button>
              <button className="btn-secondary text-lg px-8 py-3">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;