import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import { enhancedSphereDistortion } from '../utils/animations';

// The animated sphere component
const AnimatedSphere = ({ color }) => {
  const meshRef = useRef();
  
  // Apply the enhanced distortion animation on each frame
  useFrame(() => {
    enhancedSphereDistortion(meshRef);
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
  
  // Handle resize to maintain aspect ratio
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        containerRef.current.style.height = `${width * 0.8}px`;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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