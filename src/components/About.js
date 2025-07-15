import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const sectionRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();
  const statsRef = useRef();

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;

    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(image,
      { x: -100, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(content,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(stats.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' },
      '-=0.5'
    );

    // Parallax effect for image
    gsap.to(image, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Counter animation
    const counters = stats.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      gsap.fromTo(counter, 
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%'
          }
        }
      );
    });
  }, []);

  const features = [
    {
      icon: './assets/icons/star.png',
      title: 'Premium Ingredients',
      description: 'Authentic Ghanaian spices and fresh local produce'
    },
    {
      icon: './assets/icons/clock.png',
      title: 'Cultural Experience',
      description: 'Traditional serving styles and dining customs'
    },
    {
      icon: './assets/icons/person.png',
      title: 'Ghanaian Chefs',
      description: 'Native chefs trained in authentic cooking techniques'
    },
    {
      icon: './assets/icons/check.png',
      title: 'Family Recipes',
      description: 'Secret recipes passed down through generations'
    }
  ];

  const stats = [
    { number: 500, label: 'Happy Clients', suffix: '+' },
    { number: 1000, label: 'Events Catered', suffix: '+' },
    { number: 20, label: 'Ghanaian Dishes', suffix: '+' },
    { number: 10, label: 'Regional Cuisines', suffix: '' }
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-gradient-to-br from-white via-gray-50 to-ghana-gold/10">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
            About <span className="text-gradient">RichDons</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ghana-red to-ghana-gold mx-auto mb-6"></div>
          <p className="text-xl text-earth-medium max-w-3xl mx-auto leading-relaxed">
            Bringing the authentic flavors of Ghana to your table with passion, 
            tradition, and modern culinary excellence.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Section */}
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="./assets/images/chef.jpg" 
                alt="Ghanaian Chef" 
                className="w-full h-96 object-cover transform hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ghana-green/30 to-transparent"></div>
            </div>
            
            {/* Floating Food Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-ghana-gold rounded-full flex items-center justify-center shadow-lg animate-bounce-slow overflow-hidden">
              <img src="./assets/images/jollof.jpeg" alt="Jollof Rice" className="w-full h-full object-cover" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-ghana-red rounded-full flex items-center justify-center shadow-lg animate-pulse-slow overflow-hidden">
              <img src="./assets/images/kelewele.jpeg" alt="Kelewele" className="w-full h-full object-cover" />
            </div>
            
            <div className="absolute top-1/2 -left-10 w-16 h-16 bg-ghana-green rounded-full flex items-center justify-center shadow-lg animate-float overflow-hidden">
              <img src="./assets/images/banku.jpeg" alt="Banku" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-earth-dark mb-4">
                Authentic Ghanaian Cuisine Since 2019
              </h3>
              <p className="text-lg text-earth-medium leading-relaxed mb-6">
                RichDons was born from a passion to share the rich culinary heritage of Ghana 
                with the world. Our journey began in a small kitchen in Accra, where traditional 
                recipes like <span className="text-ghana-red font-semibold">Jollof Rice</span>, <span className="text-ghana-gold font-semibold">Kelewele</span>, and <span className="text-ghana-green font-semibold">Banku & Tilapia</span> were perfected using time-honored techniques and authentic spices.
              </p>
              <p className="text-lg text-earth-medium leading-relaxed mb-6">
                Our chefs have mastered the art of balancing the complex flavors that make Ghanaian cuisine unique - from the spicy heat of scotch bonnet peppers to the rich creaminess of groundnut soup and the tangy notes of fermented corn dough.
              </p>
              <p className="text-lg text-earth-medium leading-relaxed">
                Today, we're proud to be one of the leading catering services, bringing authentic 
                Ghanaian flavors to weddings, corporate events, and special celebrations across 
                the region while educating our clients about the cultural significance behind each dish.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 card-hover"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-ghana-red to-warm-orange rounded-lg flex items-center justify-center">
                    <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-earth-dark mb-1">{feature.title}</h4>
                    <p className="text-sm text-earth-medium">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-on-scroll">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg card-hover">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                <span className="counter" data-target={stat.number}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-earth-medium font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="bg-gradient-to-r from-ghana-green to-ghana-red p-8 rounded-3xl text-white relative overflow-hidden">
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
                Let us bring the rich flavors and cultural experience of Ghanaian cuisine to your next event
              </p>
              <button className="btn-secondary text-lg px-8 py-3 hover:scale-105 transition-transform duration-300">
                Get Your Ghanaian Feast
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;