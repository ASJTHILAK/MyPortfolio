import React, { useState, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import CameraController from './components/CameraController';
import { CAMERA, TIMING } from './constants/config';
import './styles/App.css';

function App() {
  const [isPlanetFocused, setIsPlanetFocused] = useState(false);
  const [planetPosition, setPlanetPosition] = useState({ x: 0, z: 0 });
  const [isReturningFromInterior, setIsReturningFromInterior] = useState(false);
  const [isInsideInterior, setIsInsideInterior] = useState(false);

  const handlePlanetFocusChange = useCallback((focused) => {
    setIsPlanetFocused(focused);
    if (!focused) {
      setIsReturningFromInterior(true);
      setIsInsideInterior(false);
      const timer = setTimeout(() => {
        setIsReturningFromInterior(false);
      }, TIMING.ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleReturnToSpace = useCallback(() => {
    setIsInsideInterior(false);
    handlePlanetFocusChange(false);
  }, [handlePlanetFocusChange]);

  // Memoize canvas configuration
  const canvasConfig = useMemo(() => ({
    camera: {
      position: CAMERA.DEFAULT_POSITION,
      fov: CAMERA.FOV,
      near: 0.1,
      far: 1000
    },
    gl: {
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    },
    dpr: [1, 2], // Adaptive DPR for better performance
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  }), []);

  return (
    <div className="App">
      <Canvas {...canvasConfig}>
        <Scene 
          isPlanetFocused={isPlanetFocused} 
          setIsPlanetFocused={handlePlanetFocusChange}
          onPlanetPositionUpdate={setPlanetPosition}
          isReturningFromInterior={isReturningFromInterior}
          isInsideInterior={isInsideInterior}
          setIsInsideInterior={setIsInsideInterior}
        />
        <CameraController 
          isPlanetFocused={isPlanetFocused} 
          planetPosition={planetPosition}
          isInsideInterior={isInsideInterior}
        />
      </Canvas>
      
      {(isPlanetFocused || isInsideInterior) && (
        <button 
          className="return-to-star-btn visible"
          onClick={handleReturnToSpace}
          aria-label={isInsideInterior ? 'Return to Space' : 'Return to Star'}
        >
          ← {isInsideInterior ? 'Return to Space' : 'Return to Star'}
        </button>
      )}
    </div>
  );
}

export default App;
