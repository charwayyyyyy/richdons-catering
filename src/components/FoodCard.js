import React, { useRef, useEffect } from 'react';
import { animate } from 'animejs';
import { animateFoodItemHover } from '../utils/animations';

const FoodCard = ({ food, onClick }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  // Set up hover animations
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    
    let hoverAnimation;
    
    const handleMouseEnter = () => {
      // Cancel any existing animation
      if (hoverAnimation) hoverAnimation.pause();
      
      // Create new animation
      hoverAnimation = animateFoodItemHover(card);
      
      // Additional animations for image and content
      animate({
        targets: image,
        scale: 1.1,
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
      });
      
      animate({
        targets: content,
        translateY: -10,
        duration: 500,
        easing: 'easeOutQuad'
      });
    };
    
    const handleMouseLeave = () => {
      // Cancel hover animation
      if (hoverAnimation) hoverAnimation.pause();
      
      // Reset card
      animate({
        targets: card,
        scale: 1,
        rotateY: 0,
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        duration: 600,
        easing: 'easeOutQuad'
      });
      
      // Reset image
      animate({
        targets: image,
        scale: 1,
        duration: 600,
        easing: 'easeOutQuad'
      });
      
      // Reset content
      animate({
        targets: content,
        translateY: 0,
        duration: 500,
        easing: 'easeOutQuad'
      });
    };
    
    // Add event listeners
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <div ref={imageRef} className="transition-transform duration-500">
          <img 
            src={food.image} 
            alt={food.name} 
            className="w-full h-48 object-cover"
          />
        </div>
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-ghana-gold text-earth-dark font-bold px-3 py-1 rounded-full shadow-md">
          ${food.price.toFixed(2)}
        </div>
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4 bg-ghana-red/80 text-white text-xs font-semibold px-2 py-1 rounded-md">
          {food.category}
        </div>
      </div>
      
      <div ref={contentRef} className="p-4 transition-all duration-300">
        <h3 className="text-xl font-bold text-ghana-gold mb-2">{food.name}</h3>
        <p className="text-gray-300 text-sm mb-3">{food.description}</p>
        
        {/* Spice Level */}
        {food.spiceLevel && (
          <div className="flex items-center mb-3">
            <span className="text-xs text-gray-400 mr-2">Spice Level:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full mr-1 ${i < food.spiceLevel ? 'bg-ghana-red' : 'bg-gray-600'}`}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Ingredients */}
        <div className="flex flex-wrap gap-1 mb-3">
          {food.ingredients && food.ingredients.map((ingredient, index) => (
            <span 
              key={index} 
              className="text-xs bg-white/10 text-ghana-gold px-2 py-1 rounded-full"
            >
              {ingredient}
            </span>
          ))}
        </div>
        
        {/* View Details Button */}
        <button 
          className="w-full mt-2 py-2 rounded-lg bg-gradient-to-r from-ghana-red via-ghana-gold to-ghana-green text-earth-dark font-semibold text-sm hover:shadow-lg transition-all duration-300 group"
          onClick={(e) => {
            e.stopPropagation(); // Prevent double triggering with parent div
            onClick && onClick(food);
          }}
        >
          <span className="mr-1">View Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FoodCard;