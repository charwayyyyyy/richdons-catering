import anime from 'animejs';
import { gsap } from 'gsap';

// Modal open animation
export const modalOpenAnimation = (modalElement, contentElement) => {
  // Animate backdrop
  anime({
    targets: modalElement,
    opacity: [0, 1],
    duration: 400,
    easing: 'easeOutQuad'
  });
  
  // Animate content with more dynamic effect
  return anime({
    targets: contentElement,
    scale: [0.8, 1],
    opacity: [0, 1],
    translateY: [30, 0],
    rotateX: [5, 0],
    duration: 600,
    easing: 'easeOutElastic(1, 0.7)'
  });
};

// Modal close animation
export const modalCloseAnimation = (modalElement, contentElement) => {
  // Animate backdrop
  anime({
    targets: modalElement,
    opacity: 0,
    duration: 300,
    easing: 'easeOutQuad'
  });
  
  // Animate content
  return anime({
    targets: contentElement,
    scale: 0.9,
    opacity: 0,
    translateY: 20,
    duration: 300,
    easing: 'easeOutQuad'
  });
};

// Food image hover animation in modal
export const modalFoodImageHover = (imageElement) => {
  return anime({
    targets: imageElement,
    scale: 1.05,
    duration: 800,
    easing: 'easeOutElastic(1, 0.7)'
  });
};

// Price tag animation
export const priceTagAnimation = (priceElement) => {
  return anime({
    targets: priceElement,
    scale: [1, 1.2, 1],
    rotate: [0, -5, 0],
    duration: 600,
    easing: 'easeOutElastic(1, 0.5)'
  });
};

// Ingredients tag animation
export const ingredientTagsAnimation = (ingredientElements) => {
  return anime({
    targets: ingredientElements,
    translateY: [10, 0],
    opacity: [0, 1],
    delay: anime.stagger(50),
    duration: 500,
    easing: 'easeOutQuad'
  });
};

// Add to order button animation
export const orderButtonAnimation = (buttonElement) => {
  return anime({
    targets: buttonElement,
    scale: [1, 1.05, 1],
    backgroundColor: {
      value: ['#E8B923', '#D62828', '#E8B923'],
      duration: 1000,
      easing: 'easeInOutSine'
    },
    boxShadow: {
      value: [
        '0 4px 6px rgba(0,0,0,0.1)',
        '0 10px 15px rgba(0,0,0,0.2)',
        '0 4px 6px rgba(0,0,0,0.1)'
      ],
      duration: 1000,
      easing: 'easeInOutSine'
    },
    duration: 1000,
    easing: 'easeInOutSine'
  });
};

// GSAP-based animations

// Staggered content reveal animation
export const staggeredContentReveal = (contentItems) => {
  return gsap.fromTo(
    contentItems,
    { 
      y: 20, 
      opacity: 0 
    },
    { 
      y: 0, 
      opacity: 1, 
      stagger: 0.1, 
      duration: 0.6, 
      ease: 'power2.out' 
    }
  );
};

// Spice level indicator animation
export const spiceLevelAnimation = (spiceIndicators) => {
  return gsap.fromTo(
    spiceIndicators,
    { 
      scale: 0, 
      opacity: 0 
    },
    { 
      scale: 1, 
      opacity: 1, 
      stagger: 0.1, 
      duration: 0.4, 
      ease: 'back.out(1.7)' 
    }
  );
};