import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import { enhancedSphereDistortion } from '../utils/animations';

// The animated sphere component
const AnimatedSphere = ({ color }) => {
  const meshRef = useRef();
  
  // Apply the enhanced distortion animation on each frame with error handling
  useFrame(() => {
    try {
      if (meshRef.current) {
        enhancedSphereDistortion(meshRef);
      }
    } catch (error) {
      console.error("Error in AnimatedSphere animation:", error);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
        metalness={0.7}
      />
    </Sphere>
  );
};

// The main component that renders the Canvas
const HeroSphere = ({ color = "#FCD116" }) => {
  const containerRef = useRef();
  const [hasError, setHasError] = useState(false);
  
  // Handle resize to maintain aspect ratio
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        containerRef.current.style.height = `${width * 0.8}px`;
      }
    };
    
    try {
      handleResize();
      window.addEventListener('resize', handleResize);
    } catch (error) {
      console.error("Error in resize handler:", error);
      setHasError(true);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full rounded-full overflow-hidden bg-ghana-gold opacity-50">
        {/* Fallback content */}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full rounded-full overflow-hidden shadow-xl"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#CE1126" />
        <pointLight position={[0, 0, 2]} intensity={1} color="#006B3F" />
        <AnimatedSphere color={color} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default HeroSphere;