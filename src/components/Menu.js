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
      image: './assets/images/burger-one.png',
      description: 'Authentic Ghanaian jollof rice with tender chicken and vegetables',
      spicy: true,
      popular: true
    },
    {
      id: 2,
      name: 'Kelewele',
      category: 'sides',
      price: 12,
      image: './assets/images/fries.png',
      description: 'Spiced fried plantain cubes with ginger and pepper',
      spicy: true,
      popular: false
    },
    {
      id: 3,
      name: 'Banku & Tilapia',
      category: 'mains',
      price: 30,
      image: './assets/images/burger-two.png',
      description: 'Traditional fermented corn dough with grilled tilapia',
      spicy: false,
      popular: true
    },
    {
      id: 4,
      name: 'Waakye',
      category: 'mains',
      price: 20,
      image: './assets/images/salad.png',
      description: 'Rice and beans cooked with millet leaves',
      spicy: false,
      popular: false
    },
    {
      id: 5,
      name: 'Sobolo',
      category: 'beverages',
      price: 8,
      image: './assets/images/pizza-one.png',
      description: 'Refreshing hibiscus drink with ginger and spices',
      spicy: false,
      popular: true
    },
    {
      id: 6,
      name: 'Red Red',
      category: 'mains',
      price: 18,
      image: './assets/images/buritto.png',
      description: 'Black-eyed peas stew with fried plantain',
      spicy: true,
      popular: false
    },
    {
      id: 7,
      name: 'Kontomire Stew',
      category: 'sides',
      price: 15,
      image: './assets/images/coleslaw.png',
      description: 'Cocoyam leaves stew with smoked fish',
      spicy: false,
      popular: false
    },
    {
      id: 8,
      name: 'Palm Nut Soup',
      category: 'mains',
      price: 28,
      image: './assets/images/mozarella-sticks.png',
      description: 'Rich palm fruit soup with assorted meat',
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
          <h2 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
            Our <span className="text-gradient">Menu</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ghana-red to-ghana-gold mx-auto mb-6"></div>
          <p className="text-xl text-earth-medium max-w-3xl mx-auto leading-relaxed">
            Discover the authentic flavors of Ghana with our carefully crafted menu 
            featuring traditional recipes and modern presentations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="categories-container flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`category-btn flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-ghana-red to-warm-orange text-white shadow-lg scale-105'
                  : 'bg-white text-earth-dark hover:bg-ghana-gold/20 hover:scale-105'
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
              className="menu-item bg-white rounded-2xl shadow-lg overflow-hidden card-hover group cursor-pointer"
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
                    <span className="bg-ghana-red text-white text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  {item.spicy && (
                    <span className="bg-warm-orange text-white text-xs font-bold px-2 py-1 rounded-full">
                      🌶️ Spicy
                    </span>
                  )}
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-ghana-gold text-earth-dark font-bold px-3 py-1 rounded-full">
                  ${item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-earth-dark mb-2 group-hover:text-ghana-red transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-earth-medium text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-ghana-red to-warm-orange text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Add to Cart
                  </button>
                  <button className="w-10 h-10 bg-ghana-gold/20 rounded-lg flex items-center justify-center hover:bg-ghana-gold/40 transition-colors duration-300">
                    <img src="./assets/icons/star.png" alt="Favorite" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-ghana-green to-earth-dark p-8 rounded-3xl text-white">
            <h3 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h3>
            <p className="text-xl mb-6 opacity-90">
              We offer custom menu options for special dietary requirements and preferences
            </p>
            <button className="btn-secondary text-lg px-8 py-3">
              Request Custom Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;