import React, { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { NAVIGATION, COLORS } from '../constants/config';

function River() {
  const geometryRef = useRef();

  const { curve, points } = useMemo(() => {
    try {
      // Create points with error handling
      const pathPoints = NAVIGATION.PATH_POINTS.map(point => {
        if (!point || !Array.isArray(point.position) || point.position.length < 3) {
          console.warn('Invalid point format in PATH_POINTS');
          return new THREE.Vector3();
        }
        return new THREE.Vector3(...point.position);
      });

      // Add control points for smoother curve
      const firstPoint = pathPoints[0].clone();
      const lastPoint = pathPoints[pathPoints.length - 1].clone();
      firstPoint.x -= 3;
      lastPoint.x += 3;
      
      // Create curve with optimized parameters
      const riverCurve = new THREE.CatmullRomCurve3(
        [firstPoint, ...pathPoints, lastPoint],
        false,
        'centripetal',
        0.5
      );

      return { curve: riverCurve, points: pathPoints };
    } catch (error) {
      console.error('Error creating river curve:', error);
      return { curve: null, points: [] };
    }
  }, []);

  // Cleanup geometry on unmount
  useEffect(() => {
    return () => {
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }
    };
  }, []);

  if (!curve) return null;

  return (
    <group>
      {/* Main water body with optimized geometry */}
      <mesh>
        <tubeGeometry 
          ref={geometryRef}
          args={[curve, 48, 0.8, 6, false]} // Reduced segments for better performance
        />
        <meshPhysicalMaterial
          color={COLORS.RIVER}
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.3}
          envMapIntensity={1}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Subtle glow effect with optimized parameters */}
      <mesh>
        <tubeGeometry 
          args={[curve, 32, 0.85, 6, false]} // Further reduced segments for glow effect
        />
        <meshPhysicalMaterial
          color={COLORS.RIVER_GLOW}
          transparent
          opacity={0.15}
          emissive={COLORS.RIVER_GLOW}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.2}
          side={THREE.BackSide} // Render on back side only for optimization
        />
      </mesh>
    </group>
  );
}

export default React.memo(River);