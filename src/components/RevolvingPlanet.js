import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { PLANET, COLORS, TIMING } from '../constants/config';
import PlanetInterior from './PlanetInterior';

function RevolvingPlanet({ setFocusOnPlanet, isFocused, onPositionUpdate, isInsideInterior, setIsInsideInterior }) {
  const planetGroup = useRef();
  const planetMesh = useRef();
  const cloudsMesh = useRef();
  const lastPosition = useRef({ x: 0, z: 0 });
  const [showInterior, setShowInterior] = useState(false);
  const [enterAnimation, setEnterAnimation] = useState(false);
  const textPosition = useRef({ x: 0, y: 0, z: 0 });
  const scaleRef = useRef(PLANET.SCALE.DEFAULT);
  const textRef = useRef();
  const textOpacity = useRef(1);
  const textYOffset = useRef(0);
  const textTargetY = useRef(1.2);
  const [textVisible, setTextVisible] = useState(true);
  const [textConfig, setTextConfig] = useState({ y: 1.2, opacity: 1 });

  useEffect(() => {
    if (!isFocused) {
      setShowInterior(false);
      setEnterAnimation(false);
      setTextVisible(true);
      scaleRef.current = PLANET.SCALE.DEFAULT;
      if (planetGroup.current) {
        planetGroup.current.scale.setScalar(PLANET.SCALE.DEFAULT);
      }
    }
  }, [isFocused]);

  const handleClick = useCallback((event) => {
    event.stopPropagation();
    if (!isFocused) {
      setFocusOnPlanet(true);
    } else if (!enterAnimation) {
      setEnterAnimation(true);
      setTextVisible(false);
      setTimeout(() => {
        setShowInterior(true);
        setIsInsideInterior(true);
      }, TIMING.ANIMATION_DURATION);
    }
  }, [setFocusOnPlanet, isFocused, enterAnimation, setIsInsideInterior]);

  const atmosphereMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: COLORS.ATMOSPHERE,
    transparent: true,
    opacity: 0.6,
    roughness: 0.2,
    metalness: 0.5,
    envMapIntensity: 1.2,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2
  }), []);

  const planetMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: COLORS.PLANET,
    roughness: 0.4,
    metalness: 0.8,
    envMapIntensity: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.3
  }), []);

  const cloudMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: COLORS.CLOUD,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    roughness: 1,
    metalness: 0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.2
  }), []);

  useFrame((state, delta) => {
    if (!planetGroup.current) return;

    if (!enterAnimation && !isInsideInterior) {
      planetGroup.current.scale.setScalar(PLANET.SCALE.DEFAULT);
      
      if (planetMesh.current) {
        planetMesh.current.rotation.y += delta * PLANET.PLANET_ROTATION_SPEED;
      }
      if (cloudsMesh.current) {
        cloudsMesh.current.rotation.y += delta * PLANET.CLOUD_ROTATION_SPEED;
      }
    }

    const angle = Date.now() * PLANET.ROTATION_SPEED;
    
    if (!isFocused) {
      planetGroup.current.position.x = PLANET.ORBIT_RADIUS * Math.cos(angle);
      planetGroup.current.position.z = PLANET.ORBIT_RADIUS * Math.sin(angle);
      lastPosition.current = {
        x: planetGroup.current.position.x,
        z: planetGroup.current.position.z
      };
    } else {
      planetGroup.current.position.x = lastPosition.current.x;
      planetGroup.current.position.z = lastPosition.current.z;
    }

    // Reset text animation values when not in enter animation
    if (!enterAnimation) {
      textOpacity.current = 1;
      textYOffset.current = 0;
      textTargetY.current = 1.2;
    }

    if (enterAnimation && textVisible) {
      // Update text config smoothly
      setTextConfig(prev => ({
        y: prev.y + delta * 2, // Move up faster
        opacity: Math.max(0, prev.opacity - delta * 2) // Fade out faster
      }));
      
      if (textConfig.opacity <= 0) {
        setTextVisible(false);
      }
    }

    if (enterAnimation) {
      // Faster fade out animation
      textOpacity.current = Math.max(0, textOpacity.current - (delta * 2));
      // Smoother upward movement
      textYOffset.current = THREE.MathUtils.lerp(textYOffset.current, 3, 0.1);
      
      scaleRef.current = THREE.MathUtils.lerp(
        scaleRef.current,
        PLANET.SCALE.SHRINK,
        TIMING.LERP_SPEED
      );
      planetGroup.current.scale.setScalar(scaleRef.current);
      
      planetGroup.current.rotation.y += delta;
      if (planetMesh.current) planetMesh.current.rotation.y += delta * 2;
      if (cloudsMesh.current) planetMesh.current.rotation.y += delta * 1.5;
    }

    // Update text position after all calculations
    textPosition.current = {
      x: planetGroup.current.position.x + 2,
      y: textConfig.y,
      z: planetGroup.current.position.z
    };

    onPositionUpdate?.({
      x: planetGroup.current.position.x,
      z: planetGroup.current.position.z
    });
  });

  if (showInterior) {
    return <PlanetInterior onReturnToSpace={() => {
      setShowInterior(false);
      setEnterAnimation(false);
      setIsInsideInterior(false);
      // Maintain focus state by not calling setFocusOnPlanet(false) here
      scaleRef.current = PLANET.SCALE.DEFAULT;
      if (planetGroup.current) {
        planetGroup.current.scale.setScalar(PLANET.SCALE.DEFAULT);
      }
      setTimeout(() => {
        setTextVisible(true);
      }, TIMING.ANIMATION_DURATION);
    }} />;
  }

  return (
    <>
      {/* Static text elements outside the planet group */}
      {isFocused && textVisible && (
        <Text
          ref={textRef}
          position={[textPosition.current.x, textConfig.y, textPosition.current.z]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
          material-transparent
          material-opacity={textConfig.opacity}
          material-depthTest={false}
          outlineWidth={0.02}
          outlineColor={COLORS.PRIMARY}
        >
          Central Hub
        </Text>
      )}

      {/* Planet group */}
      <group ref={planetGroup}>
        {/* Atmosphere */}
        <mesh scale={1.1}>
          <sphereGeometry args={[0.52, 64, 64]} />
          <primitive object={atmosphereMaterial} />
        </mesh>

        {/* Planet Core */}
        <mesh ref={planetMesh} onClick={handleClick}>
          <sphereGeometry args={[0.5, 64, 64]} />
          <primitive object={planetMaterial} />
        </mesh>
        
        {/* Cloud Layer */}
        <mesh ref={cloudsMesh} scale={[1.02, 1.02, 1.02]}>
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshPhysicalMaterial {...cloudMaterial} />
        </mesh>
      </group>
    </>
  );
}

export default React.memo(RevolvingPlanet);