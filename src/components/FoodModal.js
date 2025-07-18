import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import { modalOpenAnimation, modalCloseAnimation, priceTagAnimation, ingredientTagsAnimation, spiceLevelAnimation } from '../utils/modalAnimations';

const FoodModal = ({ food, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  
  // Handle animation when modal opens/closes
  useEffect(() => {
    if (!modalRef.current || !contentRef.current) return;
    
    if (isOpen) {
      // Use enhanced modal open animation
      modalOpenAnimation(modalRef.current, contentRef.current);
      
      // Animate spice level indicators if they exist
      const spiceIndicators = document.querySelectorAll('.spice-indicator');
      if (spiceIndicators.length > 0) {
        spiceLevelAnimation(spiceIndicators);
      }
      
      // Animate ingredient tags with staggered effect
      const ingredientTags = document.querySelectorAll('.ingredient-tag');
      if (ingredientTags.length > 0) {
        ingredientTagsAnimation(ingredientTags);
      }
      
      // Animate price tag
      const priceTag = document.querySelector('.price-tag');
      if (priceTag) {
        setTimeout(() => {
          priceTagAnimation(priceTag);
        }, 300);
      }
    } else {
      // Use enhanced modal close animation
      modalCloseAnimation(modalRef.current, contentRef.current);
    }
  }, [isOpen]);
  
  // Close modal when clicking outside content
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };
  
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen || !food) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        ref={contentRef}
        className="bg-earth-dark/95 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Food Image */}
          <div className="relative h-64 md:h-full">
            <div className="absolute inset-0">
              <img 
                src={food.image} 
                alt={food.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/90 to-transparent"></div>
            
            {/* Price Tag */}
            <div className="absolute top-4 left-4 bg-ghana-gold text-earth-dark font-bold px-4 py-2 rounded-full shadow-lg price-tag">
              ${food.price.toFixed(2)}
            </div>
            
            {/* Category Badge */}
            <div className="absolute bottom-4 left-4 bg-ghana-red/90 text-white text-sm font-semibold px-3 py-1 rounded-md">
              {food.category}
            </div>
          </div>
          
          {/* Food Details */}
          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold text-ghana-gold mb-3">{food.name}</h2>
            <p className="text-gray-300 mb-6">{food.description}</p>
            
            {/* Spice Level */}
            {food.spiceLevel && (
              <div className="mb-4">
                <h3 className="text-white text-lg font-semibold mb-2">Spice Level</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-5 h-5 rounded-full mr-2 spice-indicator ${i < food.spiceLevel ? 'bg-ghana-red' : 'bg-gray-600'}`}
                    />
                  ))}
                  <span className="text-gray-300 ml-2">
                    {food.spiceLevel <= 1 ? 'Mild' : 
                     food.spiceLevel <= 3 ? 'Medium' : 'Hot'}
                  </span>
                </div>
              </div>
            )}
            
            {/* Preparation Time */}
            {food.preparationTime && (
              <div className="mb-4">
                <h3 className="text-white text-lg font-semibold mb-2">Preparation Time</h3>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ghana-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">{food.preparationTime} minutes</span>
                </div>
              </div>
            )}
            
            {/* Calories */}
            {food.calories && (
              <div className="mb-4">
                <h3 className="text-white text-lg font-semibold mb-2">Calories</h3>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ghana-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-gray-300">{food.calories} kcal</span>
                </div>
              </div>
            )}
            
            {/* Ingredients */}
            {food.ingredients && food.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white text-lg font-semibold mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {food.ingredients.map((ingredient, index) => (
                    <span 
                      key={index} 
                      className="text-sm bg-white/10 text-ghana-gold px-3 py-1 rounded-full ingredient-tag"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Order Button */}
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-ghana-red via-ghana-gold to-ghana-green text-earth-dark font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 mt-4">
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;