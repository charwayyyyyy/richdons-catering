import anime from 'animejs';
import { gsap } from 'gsap';

// Enhanced hero title animation
export const enhancedHeroTitleAnimation = (titleElement) => {
  const chars = titleElement.querySelectorAll('.char');
  
  return anime({
    targets: chars,
    translateY: [100, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: anime.stagger(30)
  });
};

// Enhanced hero subtitle animation
export const enhancedHeroSubtitleAnimation = (subtitleElement) => {
  return anime({
    targets: subtitleElement,
    translateY: [20, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1000,
    delay: 500
  });
};

// Enhanced CTA buttons animation
export const enhancedCTAButtonsAnimation = (buttonsContainer) => {
  const buttons = buttonsContainer.querySelectorAll('button, a');
  
  return anime({
    targets: buttons,
    translateY: [20, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 800,
    delay: anime.stagger(150, {start: 800})
  });
};

// Enhanced floating food animation
export const enhancedFloatingFoodAnimation = (foodElements) => {
  foodElements.forEach((element, index) => {
    const delay = index * 300;
    const direction = index % 2 === 0 ? 1 : -1;
    
    // Initial reveal animation
    anime({
      targets: element,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: 'easeOutQuad',
      duration: 1000,
      delay: 500 + delay
    });
    
    // Continuous floating animation
    setTimeout(() => {
      anime({
        targets: element,
        translateY: [`${direction * 15}px`, `${-direction * 15}px`],
        translateX: [`${-direction * 5}px`, `${direction * 5}px`],
        rotate: [`${direction * 2}deg`, `${-direction * 2}deg`],
        easing: 'easeInOutSine',
        duration: 4000 + index * 1000,
        loop: true,
        direction: 'alternate'
      });
    }, 1500 + delay);
  });
};

// Enhanced sphere animation
export const enhancedSphereAnimation = (sphereElement) => {
  // Initial reveal
  anime({
    targets: sphereElement,
    scale: [0.8, 1],
    opacity: [0, 1],
    easing: 'easeOutElastic(1, 0.8)',
    duration: 1500
  });
  
  // Continuous subtle pulsing
  setTimeout(() => {
    anime({
      targets: sphereElement,
      scale: [1, 1.05, 1],
      opacity: [1, 0.9, 1],
      easing: 'easeInOutSine',
      duration: 8000,
      loop: true
    });
  }, 1500);
};

// GSAP-based animations

// Parallax scroll effect for hero section
export const heroParallaxEffect = (heroSection) => {
  const sphere = heroSection.querySelector('.hero-sphere');
  const content = heroSection.querySelector('.hero-content');
  const floatingElements = heroSection.querySelectorAll('.floating-food');
  
  gsap.to(sphere, {
    y: 100,
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  gsap.to(content, {
    y: 50,
    opacity: 0.5,
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  floatingElements.forEach((element, i) => {
    const direction = i % 2 === 0 ? -1 : 1;
    gsap.to(element, {
      x: direction * 100,
      y: 100,
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};

// Text reveal animation with character splitting
export const textRevealAnimation = (textElement, delay = 0) => {
  // Split text into characters if not already split
  if (!textElement.querySelector('.char')) {
    const text = textElement.textContent;
    textElement.innerHTML = '';
    
    [...text].forEach(char => {
      const charSpan = document.createElement('span');
      charSpan.classList.add('char');
      charSpan.textContent = char === ' ' ? '\u00A0' : char;
      textElement.appendChild(charSpan);
    });
  }
  
  const chars = textElement.querySelectorAll('.char');
  
  return gsap.fromTo(
    chars,
    { 
      y: 100, 
      opacity: 0 
    },
    { 
      y: 0, 
      opacity: 1, 
      stagger: 0.03, 
      duration: 0.8, 
      ease: 'power4.out',
      delay: delay
    }
  );
};