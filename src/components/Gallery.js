import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef();
  const galleryRef = useRef();

  const filters = [
    { id: 'all', name: 'All Photos' },
    { id: 'events', name: 'Events' },
    { id: 'food', name: 'Food' },
    { id: 'setup', name: 'Setup' },
    { id: 'team', name: 'Our Team' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: './assets/images/burger-one.png',
      alt: 'Jollof Rice Special',
      category: 'food',
      title: 'Signature Jollof Rice',
      description: 'Our famous jollof rice with perfectly seasoned chicken'
    },
    {
      id: 2,
      src: './assets/images/login-graphic.png',
      alt: 'Wedding Setup',
      category: 'events',
      title: 'Elegant Wedding Setup',
      description: 'Beautiful wedding catering setup with traditional elements'
    },
    {
      id: 3,
      src: './assets/images/pizza-one.png',
      alt: 'Kelewele',
      category: 'food',
      title: 'Spiced Kelewele',
      description: 'Traditional spiced plantain cubes'
    },
    {
      id: 4,
      src: './assets/images/success.png',
      alt: 'Corporate Event',
      category: 'events',
      title: 'Corporate Catering',
      description: 'Professional corporate event catering'
    },
    {
      id: 5,
      src: './assets/images/burger-two.png',
      alt: 'Banku and Tilapia',
      category: 'food',
      title: 'Banku & Grilled Tilapia',
      description: 'Traditional banku served with perfectly grilled tilapia'
    },
    {
      id: 6,
      src: './assets/images/avatar.png',
      alt: 'Chef at Work',
      category: 'team',
      title: 'Our Expert Chef',
      description: 'Master chef preparing authentic Ghanaian cuisine'
    },
    {
      id: 7,
      src: './assets/images/salad.png',
      alt: 'Fresh Salad',
      category: 'food',
      title: 'Garden Fresh Salad',
      description: 'Crisp vegetables with traditional dressing'
    },
    {
      id: 8,
      src: './assets/images/splash-icon.png',
      alt: 'Table Setup',
      category: 'setup',
      title: 'Elegant Table Setting',
      description: 'Professional table setup for special occasions'
    },
    {
      id: 9,
      src: './assets/images/buritto.png',
      alt: 'Red Red',
      category: 'food',
      title: 'Red Red Stew',
      description: 'Black-eyed peas stew with fried plantain'
    },
    {
      id: 10,
      src: './assets/images/empty-state.png',
      alt: 'Kitchen Setup',
      category: 'setup',
      title: 'Professional Kitchen',
      description: 'State-of-the-art kitchen facilities'
    },
    {
      id: 11,
      src: './assets/images/mozarella-sticks.png',
      alt: 'Palm Nut Soup',
      category: 'food',
      title: 'Palm Nut Soup',
      description: 'Rich and flavorful traditional palm nut soup'
    },
    {
      id: 12,
      src: './assets/images/icon.png',
      alt: 'Cooking Class',
      category: 'events',
      title: 'Cooking Workshop',
      description: 'Interactive cooking class with participants'
    }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    
    // Animate section header
    gsap.fromTo('.gallery-header',
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

    // Animate filter buttons
    gsap.fromTo('.filter-btn',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.filters-container',
          start: 'top 80%'
        }
      }
    );
  }, []);

  useEffect(() => {
    // Animate gallery items when filter changes
    const galleryItems = galleryRef.current?.children;
    if (galleryItems) {
      gsap.fromTo(galleryItems,
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
  }, [activeFilter]);

  const handleFilterChange = (filterId) => {
    if (filterId !== activeFilter) {
      const galleryItems = galleryRef.current?.children;
      if (galleryItems) {
        gsap.to(galleryItems, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setActiveFilter(filterId);
          }
        });
      } else {
        setActiveFilter(filterId);
      }
    }
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="gallery" ref={sectionRef} className="section-padding bg-gradient-to-br from-white via-ghana-gold/5 to-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="gallery-header text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-earth-dark mb-6">
            Our <span className="text-gradient">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ghana-red to-ghana-gold mx-auto mb-6"></div>
          <p className="text-xl text-earth-medium max-w-3xl mx-auto leading-relaxed">
            Take a visual journey through our culinary creations, memorable events, 
            and the passion that goes into every dish we serve.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filters-container flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`filter-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-ghana-red to-warm-orange text-white shadow-lg scale-105'
                  : 'bg-white text-earth-dark hover:bg-ghana-gold/20 hover:scale-105 shadow-md'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item group cursor-pointer overflow-hidden rounded-2xl shadow-lg card-hover ${
                index % 7 === 0 || index % 7 === 3 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(image)}
            >
              <div className="relative h-64 md:h-full overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>

                {/* View Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <img src="./assets/icons/search.png" alt="View" className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-8 bg-gradient-to-r from-ghana-green to-earth-dark rounded-3xl text-white">
          <div className="text-center">
            <div className="text-4xl font-bold text-ghana-gold mb-2">500+</div>
            <div className="text-lg">Events Captured</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ghana-gold mb-2">1000+</div>
            <div className="text-lg">Happy Moments</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ghana-gold mb-2">50+</div>
            <div className="text-lg">Signature Dishes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ghana-gold mb-2">15+</div>
            <div className="text-lg">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
            >
              ✕
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-lg opacity-90">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;