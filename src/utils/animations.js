import { animate, stagger } from 'animejs';

import { gsap } from 'gsap';

// Food item hover animation
export const animateFoodItemHover = (element) => {
  return animate({
    targets: element,
    scale: [1, 1.05],
    rotateY: [0, 5],
    boxShadow: [
      '0 5px 15px rgba(0,0,0,0.1)',
      '0 15px 25px rgba(0,0,0,0.2)'
    ],
    duration: 800,
    easing: 'easeOutElastic(1, .6)'
  });
};

// Button hover animation
export const animateButtonHover = (element) => {
  return animate({
    targets: element,
    scale: [1, 1.1],
    boxShadow: [
      '0 5px 15px rgba(0,0,0,0.1)',
      '0 10px 20px rgba(0,0,0,0.2)'
    ],
    duration: 600,
    easing: 'easeOutElastic(1, .6)'
  });
};

// Page transition animation
export const pageTransition = (container) => {
  return animate({
    targets: container,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 800,
    delay: 100 // Removed stagger as it's not available in the same way
  });
};

// Staggered list animation
export const staggeredList = (elements, delay = 50) => {
  return animate({
    targets: elements,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 800,
    delay: stagger(delay) // Use stagger function
  });
};

// Text reveal animation
export const textReveal = (element) => {
  return animate({
    targets: element,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 800,
    delay: (el, i) => 300 + 100 * i
  });
};

// Ghanaian flag color wave animation
export const ghanaFlagWave = (elements) => {
  return anime({
    targets: elements,
    backgroundColor: [
      { value: '#CE1126' }, // Ghana Red
      { value: '#FCD116' }, // Ghana Gold
      { value: '#006B3F' }, // Ghana Green
      { value: '#CE1126' }  // Back to Red
    ],
    duration: 4000,
    easing: 'easeInOutSine',
    direction: 'alternate',
    loop: true
  });
};

// Floating food images animation
export const floatingFoodImages = (elements) => {
  animate({
    targets: elements,
    translateY: function() {
      return Math.random() * 30 - 15; // Using Math.random instead of anime.random
    },
    translateX: function() {
      return Math.random() * 10 - 5; // Using Math.random instead of anime.random
    },
    rotate: function() {
      return Math.random() * 10 - 5; // Using Math.random instead of anime.random
    },
    opacity: [0.3, 0.8],
    easing: 'easeInOutQuad',
    duration: 4000,
    delay: stagger(200), // Use stagger function
    direction: 'alternate',
    loop: true
  });
};

// Counter animation
export const counterAnimation = (element, target, duration = 2000) => {
  let obj = { count: 0 };
  
  return animate({
    targets: obj,
    count: target,
    round: 1,
    duration: duration,
    easing: 'easeInOutExpo',
    update: function() {
      element.innerHTML = obj.count;
    }
  });
};

// Enhanced distortion animation for the sphere in Hero.js
export const enhancedSphereDistortion = (meshRef) => {
  // This function will be called from useFrame in Hero.js
  if (meshRef.current) {
    const time = performance.now() * 0.001; // Convert to seconds
    
    // More complex distortion pattern
    const distortionBase = 0.3;
    const distortionWave = Math.sin(time) * 0.2;
    const distortionNoise = Math.sin(time * 2.5) * 0.1;
    
    meshRef.current.material.distort = distortionBase + distortionWave + distortionNoise;
    
    // Add pulsating effect
    const scale = 1 + Math.sin(time * 0.5) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
    
    // Add rotation variations
    meshRef.current.rotation.x = Math.sin(time) * 0.3;
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.z = Math.cos(time * 0.7) * 0.1;
  }
};

// GSAP-based parallax effect
export const createParallaxEffect = (elements, strength = 0.1) => {
  gsap.utils.toArray(elements).forEach(element => {
    gsap.to(element, {
      y: () => strength * (window.innerHeight - element.getBoundingClientRect().top),
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};