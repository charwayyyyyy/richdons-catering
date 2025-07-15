import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef();
  const menuGridRef = useRef();

  const categories = [
    { id: 'all', name: 'All Items', icon: './assets/icons/star.png' },
    { id: 'mains', name: 'Main Dishes', icon: './assets/icons/home.png' },
    { id: 'sides', name: 'Sides', icon: './assets/icons/plus.png' },
    { id: 'beverages', name: 'Beverages', icon: './assets/icons/dollar.png' }
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Jollof Rice Special',
      category: 'mains',
      price: 25,
      image: './assets/images/jollof.jpeg',
      description: 'Authentic Ghanaian jollof rice with tender chicken and vegetables',
      spicy: true,
      popular: true
    },
    {
      id: 2,
      name: 'Kelewele',
      category: 'sides',
      price: 12,
      image: './assets/images/kelewele.jpeg',
      description: 'Spiced fried plantain cubes with ginger and pepper',
      spicy: true,
      popular: false
    },
    {
      id: 3,
      name: 'Banku & Tilapia',
      category: 'mains',
      price: 30,
      image: './assets/images/banku.jpeg',
      description: 'Traditional fermented corn dough with grilled tilapia',
      spicy: false,
      popular: true
    },
    {
      id: 4,
      name: 'Waakye',
      category: 'mains',
      price: 20,
      image: './assets/images/gob3.webp',
      description: 'Rice and beans cooked with millet leaves',
      spicy: false,
      popular: false
    },
    {
      id: 5,
      name: 'Ampesi',
      category: 'sides',
      price: 15,
      image: './assets/images/ampesi.jpeg',
      description: 'Boiled yam, plantain, and cocoyam served with garden egg stew',
      spicy: false,
      popular: true
    },
    {
      id: 6,
      name: 'Red Red',
      category: 'mains',
      price: 18,
      image: './assets/images/Food-Plate.png',
      description: 'Black-eyed peas stew with fried plantain',
      spicy: true,
      popular: false
    },
    {
      id: 7,
      name: 'Angwamo (Grilled Tilapia)',
      category: 'mains',
      price: 32,
      image: './assets/images/angwamo.jpeg',
      description: 'Perfectly grilled whole tilapia with spicy pepper sauce',
      spicy: true,
      popular: false
    },
    {
      id: 8,
      name: 'Biryani Rice',
      category: 'mains',
      price: 28,
      image: './assets/images/biryani.webp',
      description: 'Fragrant rice dish with spices, meat, and vegetables',
      spicy: true,
      popular: true
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    
    // Animate section on scroll
    gsap.fromTo('.menu-header',
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

    // Animate category buttons
    gsap.fromTo('.category-btn',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.categories-container',
          start: 'top 80%'
        }
      }
    );
  }, []);

  useEffect(() => {
    // Animate menu items when category changes
    const menuItems = menuGridRef.current?.children;
    if (menuItems) {
      gsap.fromTo(menuItems,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId !== activeCategory) {
      // Animate out current items
      const menuItems = menuGridRef.current?.children;
      if (menuItems) {
        gsap.to(menuItems, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setActiveCategory(categoryId);
          }
        });
      } else {
        setActiveCategory(categoryId);
      }
    }
  };

  return (
    <section id="menu" ref={sectionRef} className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="menu-header text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
              Our <span className="text-gradient">Ghanaian Delicacies</span>
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-ghana-gold opacity-30 transform -skew-x-3 z-0"></div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-ghana-red to-ghana-gold mx-auto mb-6"></div>
          <p className="text-xl text-earth-medium max-w-3xl mx-auto leading-relaxed">
            Discover the authentic flavors of Ghana with our carefully crafted menu 
            featuring traditional recipes and modern presentations with authentic spices from the heart of West Africa.
          </p>
        </div>

        {/* Category Filter */}
        <div className="categories-container flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`category-btn flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md border-2 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-ghana-red to-warm-orange text-white shadow-lg scale-105 border-ghana-gold'
                  : 'bg-white text-earth-dark hover:bg-ghana-gold/20 hover:scale-105 border-transparent'
              }`}
            >
              <img src={category.icon} alt={category.name} className="w-5 h-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div ref={menuGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="menu-item bg-white rounded-2xl shadow-lg overflow-hidden card-hover group cursor-pointer border-2 border-ghana-gold"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.popular && (
                    <span className="bg-ghana-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      Popular
                    </span>
                  )}
                  {item.spicy && (
                    <span className="bg-warm-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      🌶️ Spicy
                    </span>
                  )}
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-ghana-gold text-earth-dark font-bold px-3 py-1 rounded-full shadow-md">
                  ₵{item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-gradient-to-b from-white to-ghana-green bg-opacity-5">
                <h3 className="text-xl font-bold text-earth-dark mb-2 group-hover:text-ghana-red transition-colors duration-300 font-ghanaian">
                  {item.name}
                </h3>
                <p className="text-earth-medium text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-ghana-red to-warm-orange text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md">
                    Add to Cart
                  </button>
                  <button className="w-10 h-10 bg-ghana-gold/20 rounded-lg flex items-center justify-center hover:bg-ghana-gold/40 transition-colors duration-300 border-2 border-ghana-red shadow-md">
                    <img src="./assets/icons/star.png" alt="Favorite" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-ghana-green to-earth-dark p-8 rounded-3xl text-white custom-menu-request">
            <div className="mb-6">
              <img 
                src="./assets/images/chef.jpg" 
                alt="Ghanaian Chef" 
                className="w-24 h-24 mx-auto rounded-full border-4 border-ghana-gold shadow-lg object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">Need a Custom Ghanaian Feast?</h3>
            <p className="text-xl mb-6 opacity-90">
              Our expert chefs can create a personalized authentic Ghanaian menu for your special event, celebration, or dietary requirements
            </p>
            <button className="btn-secondary text-lg px-8 py-3 hover:scale-105 transition-transform duration-300">
              Request Custom Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;