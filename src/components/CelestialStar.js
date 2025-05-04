import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

function CelestialStar({ isVisible = true }) {
  const starRef = useRef();
  const opacityRef = useRef(1);

  // Memoize material configuration
  const material = useMemo(() => ({
    color: 0xffff00,
    emissive: 0xffff00,
    emissiveIntensity: 1,
    roughness: 0.1,
    metalness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.5,
    transparent: true,
    opacity: 1
  }), []);

  // Cleanup on unmount
  useEffect(() => {
    const currentStar = starRef.current;
    return () => {
      if (currentStar) {
        if (currentStar.geometry) currentStar.geometry.dispose();
        if (currentStar.material) currentStar.material.dispose();
      }
    };
  }, []);

  useFrame(() => {
    if (starRef.current) {
      // Rotate the star
      starRef.current.rotation.y += 0.01;
      
      // Smooth opacity transition
      const targetOpacity = isVisible ? 1 : 0;
      opacityRef.current += (targetOpacity - opacityRef.current) * 0.1;
      
      if (starRef.current.material) {
        starRef.current.material.opacity = opacityRef.current;
        starRef.current.material.emissiveIntensity = opacityRef.current;
      }
    }
  });

  return (
    <>
      <mesh ref={starRef}>
        <sphereGeometry args={[1, 32, 32]} /> {/* Reduced segments for better performance */}
        <meshPhysicalMaterial {...material} />
      </mesh>
      <pointLight 
        position={[0, 0, 0]} 
        intensity={2} 
        distance={8}
        decay={2}
      />
    </>
  );
}

export default React.memo(CelestialStar);