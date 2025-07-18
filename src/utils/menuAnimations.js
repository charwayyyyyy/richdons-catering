import { animate, Timeline } from 'animejs';
import { gsap } from 'gsap';

// Enhanced food card hover animation with Ghanaian-themed effects
export const enhancedFoodCardHover = (element) => {
  // Create a timeline for sequenced animations
  const timeline = new Timeline({
    targets: element,
    duration: 800,
    easing: 'easeOutElastic(1, .6)',
    autoplay: false
  });
  
  // Add scale and shadow effects
  timeline.add({
    scale: [1, 1.05],
    boxShadow: [
      '0 5px 15px rgba(0,0,0,0.1)',
      '0 15px 30px rgba(0,0,0,0.15)'
    ],
  })
  // Add a subtle border color change to Ghana flag colors
  .add({
    borderColor: ['rgba(0,0,0,0.1)', 'rgba(206, 17, 38, 0.5)'], // Ghana red
    offset: '-=800' // Start at the same time as the previous animation
  });
  
  return timeline;
};

// Food image reveal animation
export const foodImageReveal = (imageElement) => {
  return animate({
    targets: imageElement,
    scale: [0.9, 1],
    opacity: [0, 1],
    rotateY: [5, 0],
    duration: 1000,
    easing: 'easeOutCubic'
  });
};

// Food content staggered reveal
export const foodContentReveal = (contentElements) => {
  return animate({
    targets: contentElements,
    translateY: [15, 0],
    opacity: [0, 1],
    duration: 800,
    delay: 100, // Simplified from stagger
    easing: 'easeOutCubic'
  });
};

// Price tag pop animation
export const priceTagPop = (priceElement) => {
  return animate({
    targets: priceElement,
    scale: [0.8, 1.2, 1],
    rotate: [0, -5, 0],
    duration: 800,
    easing: 'easeOutElastic(1, 0.5)'
  });
};

// Spice level indicator animation
export const spiceLevelPulse = (spiceElements) => {
  return animate({
    targets: spiceElements,
    scale: [1, 1.2],
    opacity: [0.7, 1],
    duration: 400,
    direction: 'alternate',
    easing: 'easeInOutQuad',
    delay: 100, // Simplified from stagger
    loop: 2
  });
};

// Category badge animation
export const categoryBadgeAnimation = (badgeElement) => {
  return animate({
    targets: badgeElement,
    translateX: [-20, 0],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutCubic'
  });
};

// View details button animation
export const viewDetailsButtonAnimation = (buttonElement) => {
  return animate({
    targets: buttonElement,
    translateY: [10, 0],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutCubic',
    complete: () => {
      // Add a subtle pulse effect after the button appears
      animate({
        targets: buttonElement,
        scale: [1, 1.05, 1],
        duration: 1500,
        easing: 'easeInOutQuad',
        delay: 300
      });
    }
  });
};

// Filter buttons animation
export const filterButtonsAnimation = (buttons) => {
  return animate({
    targets: buttons,
    scale: [0.9, 1],
    opacity: [0, 1],
    translateY: [10, 0],
    duration: 600,
    delay: 100, // Simplified from stagger
    easing: 'easeOutCubic'
  });
};

// Active filter highlight animation
export const activeFilterAnimation = (button) => {
  return animate({
    targets: button,
    backgroundColor: [
      'rgba(0, 107, 63, 0.1)', // Ghana green (light)
      'rgba(0, 107, 63, 0.3)', // Ghana green (medium)
    ],
    borderColor: [
      'rgba(0, 107, 63, 0.3)',
      'rgba(0, 107, 63, 0.8)'
    ],
    scale: [1, 1.05, 1],
    duration: 600,
    easing: 'easeOutCubic'
  });
};

// Menu section title animation
export const menuTitleAnimation = (titleElement) => {
  const letters = titleElement.textContent.split('');
  titleElement.textContent = '';
  
  letters.forEach(letter => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.display = 'inline-block';
    titleElement.appendChild(span);
  });
  
  return animate({
    targets: titleElement.querySelectorAll('span'),
    translateY: [50, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: 50 // Simplified from stagger
  });
};