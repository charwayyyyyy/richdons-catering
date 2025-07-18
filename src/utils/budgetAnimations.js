import { animate } from 'animejs';
import { gsap } from 'gsap';

// Budget form field animation
export const budgetFormFieldAnimation = (elements, delay = 50) => {
  return animate({
    targets: elements,
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 800,
    delay: delay, // Simplified from stagger
    easing: 'easeOutCubic'
  });
};

// Budget result reveal animation
export const budgetResultReveal = (element) => {
  return animate({
    targets: element,
    scale: [0.9, 1],
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1000,
    easing: 'easeOutElastic(1, 0.6)'
  });
};

// Price breakdown animation
export const priceBreakdownAnimation = (elements) => {
  return animate({
    targets: elements,
    translateX: [-20, 0],
    opacity: [0, 1],
    duration: 800,
    delay: 100, // Simplified from stagger
    easing: 'easeOutCubic'
  });
};

// Total price highlight animation
export const totalPriceAnimation = (element) => {
  return animate({
    targets: element,
    scale: [1, 1.1, 1],
    color: [
      '#000000',
      '#CE1126', // Ghana red
      '#000000'
    ],
    duration: 1500,
    easing: 'easeOutElastic(1, 0.5)'
  });
};

// Service option hover animation
export const serviceOptionHover = (element) => {
  return animate({
    targets: element,
    scale: [1, 1.02],
    boxShadow: [
      '0 2px 5px rgba(0,0,0,0.1)',
      '0 5px 15px rgba(0,0,0,0.2)'
    ],
    borderColor: [
      'rgba(0,0,0,0.1)',
      'rgba(252, 209, 22, 0.5)' // Ghana gold
    ],
    duration: 400,
    easing: 'easeOutQuad'
  });
};

// Guest count slider animation
export const guestCountSliderAnimation = (element, value) => {
  // Animate the slider background fill based on value
  const percentage = (value / 500) * 100; // Assuming max is 500 guests
  
  return animate({
    targets: element,
    width: `${percentage}%`,
    backgroundColor: [
      'rgba(0, 107, 63, 0.3)', // Ghana green (light)
      'rgba(0, 107, 63, 0.8)' // Ghana green (darker)
    ],
    duration: 400,
    easing: 'easeOutQuad'
  });
};

// Budget calculator background pattern animation
export const backgroundPatternAnimation = (elements) => {
  return animate({
    targets: elements,
    translateX: function() { return Math.random() * 10 - 5; }, // Using Math.random instead of anime.random
    translateY: function() { return Math.random() * 10 - 5; }, // Using Math.random instead of anime.random
    rotate: function() { return Math.random() * 6 - 3; }, // Using Math.random instead of anime.random
    opacity: [0.3, 0.5],
    duration: 8000,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });
};

// Submit button animation
export const submitButtonAnimation = (element) => {
  return animate({
    targets: element,
    scale: [0.95, 1],
    backgroundColor: [
      'rgba(0, 107, 63, 0.8)', // Ghana green
      'rgba(0, 107, 63, 1)' // Ghana green (full)
    ],
    boxShadow: [
      '0 5px 15px rgba(0, 107, 63, 0.3)',
      '0 8px 20px rgba(0, 107, 63, 0.5)'
    ],
    duration: 600,
    easing: 'easeOutElastic(1, 0.6)'
  });
};

// Reset button animation
export const resetButtonAnimation = (element) => {
  return animate({
    targets: element,
    scale: [0.95, 1],
    backgroundColor: [
      'rgba(206, 17, 38, 0.8)', // Ghana red
      'rgba(206, 17, 38, 1)' // Ghana red (full)
    ],
    boxShadow: [
      '0 5px 15px rgba(206, 17, 38, 0.3)',
      '0 8px 20px rgba(206, 17, 38, 0.5)'
    ],
    duration: 600,
    easing: 'easeOutElastic(1, 0.6)'
  });
};

// Success message animation
export const successMessageAnimation = (element) => {
  return animate({
    targets: element,
    translateY: [-20, 0],
    opacity: [0, 1],
    backgroundColor: [
      'rgba(0, 107, 63, 0)',
      'rgba(0, 107, 63, 0.1)'
    ],
    duration: 800,
    easing: 'easeOutCubic'
  });
};

// Error message animation
export const errorMessageAnimation = (element) => {
  return animate({
    targets: element,
    translateY: [-20, 0],
    opacity: [0, 1],
    backgroundColor: [
      'rgba(206, 17, 38, 0)',
      'rgba(206, 17, 38, 0.1)'
    ],
    duration: 800,
    easing: 'easeOutCubic'
  });
};