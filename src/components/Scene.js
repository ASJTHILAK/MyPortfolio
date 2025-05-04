import React, { useMemo, useEffect } from 'react';
import { Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import CelestialStar from './CelestialStar';
import RevolvingPlanet from './RevolvingPlanet';

function Scene({ isPlanetFocused, setIsPlanetFocused, onPlanetPositionUpdate, isInsideInterior, setIsInsideInterior }) {
  // Memoize configurations
  const envConfig = useMemo(() => ({
    preset: "city"
  }), []);

  const starsConfig = useMemo(() => ({
    radius: 100,
    depth: 50,
    count: 5000, // Reduced for better performance
    factor: 4,
    saturation: 0.5,
    fade: true,
    speed: 0.5 // Reduced for smoother animation
  }), []);

  const bloomConfig = useMemo(() => ({
    intensity: 1,
    luminanceThreshold: 0.6,
    luminanceSmoothing: 0.3,
    mipmapBlur: true
  }), []);

  const lightConfig = useMemo(() => ({
    ambient: {
      intensity: 0.15
    },
    directional: {
      position: [5, 3, 5],
      intensity: 0.4,
      castShadow: false
    }
  }), []);

  // Clean up GPU resources
  useEffect(() => {
    return () => {
      // Clean up any post-processing effects
      if (bloomConfig) {
        // Force GC of effects
        bloomConfig.dispose && bloomConfig.dispose();
      }
    };
  }, [bloomConfig]);

  return (
    <>
      <color attach="background" args={['#000010']} />
      <fog attach="fog" args={['#000010', 5, 30]} />
      
      <Environment {...envConfig} />
      <Stars {...starsConfig} />
      
      <CelestialStar isVisible={!isPlanetFocused && !isInsideInterior} />
      <RevolvingPlanet 
        setFocusOnPlanet={setIsPlanetFocused} 
        isFocused={isPlanetFocused}
        onPositionUpdate={onPlanetPositionUpdate}
        isInsideInterior={isInsideInterior}
        setIsInsideInterior={setIsInsideInterior}
      />

      <EffectComposer multisampling={0}>
        <Bloom {...bloomConfig} />
      </EffectComposer>

      {/* Optimized lighting */}
      <ambientLight intensity={lightConfig.ambient.intensity} />
      <directionalLight 
        position={lightConfig.directional.position}
        intensity={lightConfig.directional.intensity}
        castShadow={lightConfig.directional.castShadow}
      />
    </>
  );
}

export default React.memo(Scene);