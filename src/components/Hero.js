import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text3D, Center } from '@react-three/drei';
import { gsap } from 'gsap';
import anime from 'animejs';
import * as THREE from 'three';
import HeroSphere from './HeroSphere';
import { enhancedHeroTitleAnimation, enhancedHeroSubtitleAnimation, enhancedCTAButtonsAnimation, enhancedFloatingFoodAnimation, textRevealAnimation } from '../utils/heroAnimations';

// Animated 3D Food Sphere
function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      // Add distortion animation
      meshRef.current.material.distort = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#FCD116"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

// Floating Food Particles
function FloatingParticles() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push(
      <mesh
        key={i}
        position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}
      >
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={Math.random() > 0.5 ? "#CE1126" : "#FCD116"} />
      </mesh>
    );
  }

  return <group ref={groupRef}>{particles}</group>;
}

const Hero = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();

  useEffect(() => {
    // Split text into characters for animated reveal
    if (titleRef.current) {
      const titleText = titleRef.current.textContent;
      titleRef.current.innerHTML = '';
      
      [...titleText].forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.classList.add('char');
        charSpan.textContent = char === ' ' ? '\u00A0' : char;
        titleRef.current.appendChild(charSpan);
      });
      
      // Apply enhanced title animation
      enhancedHeroTitleAnimation(titleRef.current);
    }
    
    // Apply enhanced subtitle animation
    if (subtitleRef.current) {
      enhancedHeroSubtitleAnimation(subtitleRef.current);
    }
    
    // Apply enhanced CTA buttons animation
    if (ctaRef.current) {
      enhancedCTAButtonsAnimation(ctaRef.current);
    }
    
    // Apply enhanced floating animation to hero content
    if (heroRef.current) {
      anime({
        targets: heroRef.current,
        translateY: [-20, 0, -20],
        duration: 6000,
        easing: 'easeInOutSine',
        loop: true
      });
    }
    
    // Apply enhanced floating food animation
    const floatingFoodElements = document.querySelectorAll('.floating-food');
    if (floatingFoodElements.length > 0) {
      enhancedFloatingFoodAnimation(Array.from(floatingFoodElements));
    }
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: menuSection.offsetTop - 80 },
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ghana-green via-earth-dark to-ghana-red"></div>
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <FloatingParticles />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Enhanced 3D Sphere */}
      <div className="absolute -right-20 top-1/4 w-96 h-96 opacity-80 hidden lg:block">
        <HeroSphere color="#FCD116" />
      </div>

      {/* Overlay Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Hero Content */}
      <div ref={heroRef} className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <img 
            src="./assets/images/logo.jpg" 
            alt="RichDons Logo" 
            className="h-32 w-32 mx-auto mb-6 animate-bounce-slow glow rounded-full border-4 border-ghana-gold"
          />
        </div>
        
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-6">
          <span className="text-white block mb-2">Welcome to</span>
          <span className="text-gradient block">RichDons</span>
        </h1>
        
        <p ref={subtitleRef} className="text-xl md:text-2xl text-ghana-gold mb-8 max-w-3xl mx-auto leading-relaxed">
          Experience the authentic taste of Ghana with our premium catering services. 
          From traditional jollof rice to modern fusion dishes, we bring the rich flavors 
          of West Africa to your special occasions.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToMenu}
            className="btn-primary text-lg px-10 py-4 group"
          >
            <span className="mr-2">Explore Our Menu</span>
            <img 
              src="./assets/icons/arrow-right.png" 
              alt="Arrow" 
              className="inline-block w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
          
          <button className="btn-secondary text-lg px-10 py-4 group">
            <img 
              src="./assets/icons/phone.png" 
              alt="Phone" 
              className="inline-block w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
            />
            <span>Call Now</span>
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <img 
            src="./assets/icons/arrow-down.png" 
            alt="Scroll Down" 
            className="w-6 h-6 opacity-70"
          />
        </div>
      </div>

      {/* Floating Ghanaian Food Images */}
      <div className="absolute top-20 left-10 floating-food">
        <img 
          src="./assets/images/jollof.jpeg" 
          alt="Jollof Rice" 
          className="w-20 h-20 opacity-30 hover:opacity-60 transition-opacity duration-300 rounded-full shadow-lg"
        />
      </div>
      
      <div className="absolute top-40 right-20 floating-food">
        <img 
          src="./assets/images/banku.jpeg" 
          alt="Banku" 
          className="w-24 h-24 opacity-30 hover:opacity-60 transition-opacity duration-300 rounded-full shadow-lg"
        />
      </div>
      
      <div className="absolute bottom-40 left-20 floating-food">
        <img 
          src="./assets/images/kelewele.jpeg" 
          alt="Kelewele" 
          className="w-18 h-18 opacity-30 hover:opacity-60 transition-opacity duration-300 rounded-full shadow-lg"
        />
      </div>
      
      <div className="absolute bottom-60 right-40 floating-food">
        <img 
          src="./assets/images/waitors.jpg" 
          alt="Service" 
          className="w-22 h-22 opacity-30 hover:opacity-60 transition-opacity duration-300 rounded-full shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;