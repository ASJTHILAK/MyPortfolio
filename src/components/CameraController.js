import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA } from '../constants/config';

function CameraController({ isPlanetFocused, planetPosition, isInsideInterior }) {
  const { camera } = useThree();
  const targetPosition = useRef(CAMERA.DEFAULT_POSITION);
  const lerpFactor = useRef(CAMERA.LERP_FACTOR);

  // Memoize default target
  const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(() => {
    // Skip camera updates when in interior view
    if (isInsideInterior) return;

    if (isPlanetFocused && planetPosition) {
      // Update target position only when needed
      if (targetPosition.current[0] !== planetPosition.x ||
          targetPosition.current[1] !== 0.8 ||
          targetPosition.current[2] !== planetPosition.z + 4) {
        targetPosition.current = [
          planetPosition.x,
          0.8,
          planetPosition.z + 4
        ];
      }
      lerpFactor.current = CAMERA.FOCUSED_LERP_FACTOR;
    } else {
      targetPosition.current = CAMERA.DEFAULT_POSITION;
      lerpFactor.current = CAMERA.LERP_FACTOR;
    }

    // Batch camera position updates
    const factor = lerpFactor.current;
    camera.position.x += (targetPosition.current[0] - camera.position.x) * factor;
    camera.position.y += (targetPosition.current[1] - camera.position.y) * factor;
    camera.position.z += (targetPosition.current[2] - camera.position.z) * factor;

    // Adjust camera tilt for better alignment
    camera.rotation.x = CAMERA.CAMERA_TILT;

    // Update camera target
    if (isPlanetFocused && planetPosition) {
      camera.lookAt(planetPosition.x, 0, planetPosition.z);
    } else {
      camera.lookAt(defaultTarget);
    }
  });

  return null;
}

export default React.memo(CameraController);