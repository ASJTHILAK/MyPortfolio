import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, RoundedBox, Html, MeshReflectorMaterial, Sky } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { COLORS, EXPERIENCE_DETAILS, SKILLS, EDUCATION, NAVIGATION, SKY as SKY_CONFIG, PERSONAL_INFO } from '../constants/config';
import { createPortal } from 'react-dom';

// Cubic easing function for smooth transitions
const easeInOutCubic = (t) => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const ExperienceSection = React.memo(({ position, title, company, duration, details }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[6, 5, 0.1]} radius={0.1}>
        <meshStandardMaterial 
          color={hovered ? COLORS.DARKER : COLORS.DARK}
          emissive={hovered ? COLORS.PRIMARY : "#000000"}
          emissiveIntensity={0.1}
        />
      </RoundedBox>
      <group position={[0, 2, 0.06]}>
        <Text position={[0, 0, 0]} fontSize={0.22} color={COLORS.TEXT_PRIMARY} anchorX="center" anchorY="middle">
          {title}
        </Text>
        <Text position={[0, -0.4, 0]} fontSize={0.18} color={COLORS.PRIMARY} anchorX="center" anchorY="middle">
          {company}
        </Text>
        <Text position={[0, -0.7, 0]} fontSize={0.14} color={COLORS.TEXT_SECONDARY} anchorX="center" anchorY="middle">
          {duration}
        </Text>
      </group>
      <group position={[0, 1, 0.06]}>
        {details.map((detail, index) => (
          <Text 
            key={index}
            position={[0, -index * 0.25, 0]} 
            fontSize={0.12} 
            color={COLORS.TEXT_SECONDARY}
            anchorX="center" 
            anchorY="middle"
            maxWidth={5.5}
          >
            • {detail}
          </Text>
        ))}
      </group>
    </group>
  );
});

const SkillsSection = React.memo(({ position }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[6, 5, 0.1]} radius={0.1}>
        <meshStandardMaterial 
          color={hovered ? COLORS.DARKER : COLORS.DARK}
          emissive={hovered ? COLORS.PRIMARY : "#000000"}
          emissiveIntensity={0.1}
        />
      </RoundedBox>
      <group position={[0, 0, 0.06]}>
        <Text position={[0, 2.2, 0]} fontSize={0.22} color={COLORS.TEXT_PRIMARY} anchorX="center" anchorY="middle">
          Technical Skills
        </Text>
        {Object.entries(SKILLS).map(([category, skills], categoryIndex) => (
          <group key={category} position={[0, 1.85 - categoryIndex * 0.7, 0]}>
            <Text position={[0, 0, 0]} fontSize={0.15} color={COLORS.PRIMARY} anchorX="center" anchorY="middle">
              {category}
            </Text>
            <group position={[0, -0.25, 0]}>
              {skills.map((skill, index) => (
                <Text 
                  key={skill}
                  position={[-2.2 + (index % 3) * 2.2, -Math.floor(index / 3) * 0.22, 0]}
                  fontSize={0.14}
                  color={COLORS.TEXT_SECONDARY}
                  anchorX="center"
                  anchorY="middle"
                >
                  {skill}
                </Text>
              ))}
            </group>
          </group>
        ))}
      </group>
    </group>
  );
});

const Education = React.memo(({ position }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[6, 5, 0.1]} radius={0.1}>
        <meshStandardMaterial 
          color={hovered ? COLORS.DARKER : COLORS.DARK}
          emissive={hovered ? COLORS.PRIMARY : "#000000"}
          emissiveIntensity={0.1}
        />
      </RoundedBox>
      <group position={[0, 0.1, 0.06]}>
        <Text position={[0, 2, 0]} fontSize={0.22} color={COLORS.TEXT_PRIMARY} anchorX="center" anchorY="middle">
          Education
        </Text>

        {/* University Education */}
        <group position={[0, 1.5, 0]}>
          <Text 
            position={[0, 0, 0]} 
            fontSize={0.16} 
            color={COLORS.PRIMARY} 
            anchorX="center" 
            anchorY="middle"
            maxWidth={5.5}
          >
            {EDUCATION.university.degree}
          </Text>
          <Text 
            position={[0, -0.3, 0]} 
            fontSize={0.14} 
            color={COLORS.TEXT_SECONDARY} 
            anchorX="center" 
            anchorY="middle"
            maxWidth={5.5}
          >
            {EDUCATION.university.institution}
          </Text>
          <Text position={[0, -0.6, 0]} fontSize={0.14} color={COLORS.TEXT_SECONDARY} anchorX="center" anchorY="middle">
            {EDUCATION.university.duration}
          </Text>
          <Text position={[0, -0.9, 0]} fontSize={0.14} color={COLORS.PRIMARY} anchorX="center" anchorY="middle">
            CGPA: {EDUCATION.university.cgpa}
          </Text>
        </group>

        {/* High School Education */}
        <group position={[0, 0.25, 0]}>
          <Text 
            position={[0, 0, 0]} 
            fontSize={0.16} 
            color={COLORS.PRIMARY} 
            anchorX="center" 
            anchorY="middle"
            maxWidth={5.5}
          >
            {EDUCATION.highSchool.degree}
          </Text>
          <Text 
            position={[0, -0.3, 0]} 
            fontSize={0.14} 
            color={COLORS.TEXT_SECONDARY} 
            anchorX="center" 
            anchorY="middle"
            maxWidth={5.5}
          >
            {EDUCATION.highSchool.institution}
          </Text>
          <Text position={[0, -0.6, 0]} fontSize={0.14} color={COLORS.TEXT_SECONDARY} anchorX="center" anchorY="middle">
            {EDUCATION.highSchool.duration}
          </Text>
          <Text position={[0, -0.9, 0]} fontSize={0.14} color={COLORS.PRIMARY} anchorX="center" anchorY="middle">
            Score: {EDUCATION.highSchool.score}
          </Text>
        </group>
      </group>
    </group>
  );
});

const DetailedExperienceSection = React.memo(({ experience, onClose }) => {
  if (!experience) return null;

  return (
    <Html center>
      <div className="section-details visible">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{experience.title}</h2>
        <h3>{experience.company}</h3>
        <p>{experience.duration}</p>
        <div style={{ textAlign: 'left' }}>
          {experience.details.map((detail, index) => (
            <p key={index}>• {detail}</p>
          ))}
        </div>
      </div>
    </Html>
  );
});

const FloatingBoat = React.memo(() => {
  const boatRef = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    // Add gentle bobbing motion
    if (boatRef.current) {
      boatRef.current.position.y = Math.sin(time.current * 2) * 0.1;
      // Add subtle roll effect
      boatRef.current.rotation.z = Math.sin(time.current * 1.5) * 0.05;
    }
  });

  return (
    <group ref={boatRef} position={[0, 0.1, 0]}>
      {/* Main hull */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[2, 0.4, 1]} />
        <meshPhysicalMaterial
          color="#8b4513"
          roughness={0.8}
          metalness={0.2}
          clearcoat={0.5}
        />
      </mesh>
      {/* Hull bottom for better water interaction */}
      <mesh position={[0, -0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.8, 0.1, 0.8]} />
        <meshPhysicalMaterial
          color="#6b3410"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      {/* Fluorescent trim */}
      <mesh position={[0, 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[2.1, 0.05, 1.1]} />
        <meshStandardMaterial
          color={COLORS.PRIMARY}
          emissive={COLORS.PRIMARY}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
});

// Add interactivity to BioLuminousPlant
const BioLuminousPlant = React.memo(({ position, colorIndex, onClick }) => {
  const plantColors = useMemo(() => [
    { color: '#50c878', stem: '#2e8b57' }, // Emerald
    { color: '#FF69B4', stem: '#C71585' }, // Pink
    { color: '#87CEEB', stem: '#4682B4' }, // Sky Blue
    { color: '#DDA0DD', stem: '#9932CC' }, // Plum
    { color: '#FFD700', stem: '#DAA520' }  // Gold
  ], []);

  const plantColor = plantColors[colorIndex % plantColors.length];

  const [hovered, setHovered] = useState(false);

  return (
    <group 
      position={position} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial
          color={hovered ? '#FFFFFF' : plantColor.color}
          emissive={plantColor.color}
          emissiveIntensity={hovered ? 3 : 2}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshPhysicalMaterial
          color={plantColor.stem}
          roughness={0.8}
          metalness={0.2}
          emissive={plantColor.stem}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
});

const AboutSection = React.memo(({ position }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[6, 5, 0.1]} radius={0.1}>
        <meshStandardMaterial 
          color={hovered ? COLORS.DARKER : COLORS.DARK}
          emissive={hovered ? COLORS.PRIMARY : "#000000"}
          emissiveIntensity={0.1}
        />
      </RoundedBox>
      <group position={[0, 0, 0.06]}>
        <Text position={[0, 2, 0]} fontSize={0.25} color={COLORS.TEXT_PRIMARY} anchorX="center" anchorY="middle">
          {PERSONAL_INFO.name}
        </Text>
        <Text position={[0, 1.5, 0]} fontSize={0.18} color={COLORS.PRIMARY} anchorX="center" anchorY="middle">
          {PERSONAL_INFO.location}
        </Text>
        <Text position={[0, 1, 0]} fontSize={0.15} color={COLORS.TEXT_SECONDARY} anchorX="center" anchorY="middle">
          {PERSONAL_INFO.email} | {PERSONAL_INFO.phone}
        </Text>
        <Text 
          position={[0, 0, 0]} 
          fontSize={0.13} 
          color={COLORS.TEXT_SECONDARY} 
          anchorX="center" 
          anchorY="middle"
          maxWidth={5.5}
          textAlign="center"
          lineHeight={1.5}
        >
          {PERSONAL_INFO.summary}
        </Text>
      </group>
    </group>
  );
});

const StartSection = React.memo(({ position }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[6, 5, 0.1]} radius={0.1}>
        <meshStandardMaterial 
          color={hovered ? COLORS.DARKER : COLORS.DARK}
          emissive={hovered ? COLORS.PRIMARY : "#000000"}
          emissiveIntensity={0.1}
        />
      </RoundedBox>
      <group position={[0, 0, 0.06]}>
      <Text position={[0, 1.8, 0]} fontSize={0.3} color={COLORS.PRIMARY} anchorX="center" anchorY="middle">
          ASJ THILAK
        </Text>
        <Text position={[0, 1.2, 0]} fontSize={0.2} color={COLORS.TEXT_PRIMARY} anchorX="center" anchorY="middle">
          Welcomes you to his Portfolio
        </Text>
        <Text 
          position={[0, 0.5, 0]} 
          fontSize={0.15} 
          color={COLORS.TEXT_SECONDARY} 
          anchorX="center" 
          anchorY="middle"
          maxWidth={5.5}
          textAlign="center"
          lineHeight={1.5}
        >
          Navigate through the journey using the arrows on the right bottom.
          Explore his experience, skills, and education in this
          interactive portfolio.
        </Text>
      </group>
    </group>
  );
});

const NavigationControls = React.memo(({ currentPathIndex, isTransitioning, maxIndex, onPrev, onNext }) => {
  return createPortal(
    <div className="navigation-controls-fixed">
      {!isTransitioning && currentPathIndex > 0 && (
        <button 
          className="navigation-button"
          onClick={onPrev}
        >
          ← Previous
        </button>
      )}
      
      {!isTransitioning && currentPathIndex < maxIndex && (
        <button 
          className="navigation-button"
          onClick={onNext}
        >
          Next →
        </button>
      )}
    </div>,
    document.body
  );
});

function PlanetInterior({ onReturnToSpace }) {
  const groupRef = useRef();
  const boatRef = useRef();
  const { camera } = useThree();
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const waterRef = useRef();
  const time = useRef(0);
  
  // Memoize curve to prevent recalculation and handle edge cases
  const curve = useMemo(() => {
    if (!NAVIGATION.PATH_POINTS || NAVIGATION.PATH_POINTS.length === 0) {
      console.warn('Navigation points are not defined');
      return null;
    }

    try {
      const points = NAVIGATION.PATH_POINTS.map(point => {
        if (!point || !Array.isArray(point.position) || point.position.length < 3) {
          throw new Error('Invalid point format in PATH_POINTS');
        }
        return new THREE.Vector3(...point.position);
      });

      // Add extra control points for smoother curve behavior
      const firstPoint = points[0].clone();
      const lastPoint = points[points.length - 1].clone();
      firstPoint.x -= 3;
      lastPoint.x += 3;

      return new THREE.CatmullRomCurve3(
        [firstPoint, ...points, lastPoint],
        false,
        'centripetal',
        0.5
      );
    } catch (error) {
      console.error('Error creating curve:', error);
      return null;
    }
  }, []);

  // Safe curve point calculation
  const getCurvePoint = useCallback((t) => {
    if (!curve) return new THREE.Vector3();
    
    try {
      const clampedT = Math.max(0, Math.min(t, 1));
      return curve.getPoint(clampedT);
    } catch (error) {
      console.warn('Error getting curve point:', error);
      return new THREE.Vector3();
    }
  }, [curve]);

  // Safe curve tangent calculation
  const getCurveTangent = useCallback((t) => {
    if (!curve) return new THREE.Vector3(0, 0, -1);
    
    try {
      const clampedT = Math.max(0, Math.min(t, 1));
      return curve.getTangent(clampedT);
    } catch (error) {
      console.warn('Error getting curve tangent:', error);
      return new THREE.Vector3(0, 0, -1);
    }
  }, [curve]);

  const handleSectionClick = useCallback((section) => {
    setSelectedSection(EXPERIENCE_DETAILS[section]);
  }, []);

  const moveToNextSection = useCallback(() => {
    if (currentPathIndex < NAVIGATION.PATH_POINTS.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      console.log(currentPathIndex, NAVIGATION.PATH_POINTS.length - 1);
      const nextIndex = currentPathIndex + 1;
      
      // Use a promise to ensure proper timing
      new Promise(resolve => {
        setTimeout(() => {
          setCurrentPathIndex(nextIndex);
          resolve();
        }, NAVIGATION.TRANSITION_DURATION / 2);
      }).then(() => {
        setTimeout(() => {
          setIsTransitioning(false);
        }, NAVIGATION.TRANSITION_DURATION / 2);
      });
    }
  }, [currentPathIndex, isTransitioning]);

  const moveToPreviousSection = useCallback(() => {
    if (currentPathIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      const prevIndex = currentPathIndex - 1;
      
      // Use a promise to ensure proper timing
      new Promise(resolve => {
        setTimeout(() => {
          setCurrentPathIndex(prevIndex);
          resolve();
        }, NAVIGATION.TRANSITION_DURATION / 2);
      }).then(() => {
        setTimeout(() => {
          setIsTransitioning(false);
        }, NAVIGATION.TRANSITION_DURATION / 2);
      });
    }
  }, [currentPathIndex, isTransitioning]);

  useFrame((state, delta) => {
    if (!boatRef.current || !curve) return;

    // Use deltaTime for consistent animation speed
    const now = state.clock.getElapsedTime();
    
    // Calculate boat position along the curve with safety checks
    const t = Math.max(0, Math.min(currentPathIndex / (NAVIGATION.PATH_POINTS.length - 1), 1));
    const curvePoint = getCurvePoint(t);
    const tangent = getCurveTangent(t);

    if (isTransitioning) {
      const progress = (now % NAVIGATION.TRANSITION_DURATION) / NAVIGATION.TRANSITION_DURATION;
      const easeProgress = easeInOutCubic(progress);
      
      const prevT = Math.max(0, (currentPathIndex - 1) / (NAVIGATION.PATH_POINTS.length - 1));
      const prevPoint = getCurvePoint(prevT);
      const nextPoint = curvePoint;
      
      if (prevPoint && nextPoint) {
        // Use Vector3.lerpVectors for better performance
        boatRef.current.position.lerpVectors(prevPoint, nextPoint, easeProgress);
      }
    } else {
      boatRef.current.position.lerp(curvePoint, delta * 2); // Scale with delta time
    }

    // More efficient boat rotation
    if (tangent) {
      const lookAtTarget = new THREE.Vector3(
        curvePoint.x + tangent.x,
        curvePoint.y,
        curvePoint.z + tangent.z
      );
      boatRef.current.lookAt(lookAtTarget);
    }

    // Optimized camera movement
    if (curvePoint && tangent) {
      const currentPoint = NAVIGATION.PATH_POINTS[currentPathIndex];
      const rotation = currentPoint?.rotation || Math.PI / 2;
      
      // Reuse vectors for better performance
      const targetCameraPos = new THREE.Vector3(
        curvePoint.x - Math.sin(rotation) * NAVIGATION.CAMERA_DISTANCE,
        curvePoint.y + NAVIGATION.CAMERA_HEIGHT,
        curvePoint.z - Math.sin(rotation) * NAVIGATION.CAMERA_DISTANCE
      );

      camera.position.lerp(targetCameraPos, delta * (isTransitioning ? 1.5 : 1));
      
      const targetLookAt = new THREE.Vector3(
        curvePoint.x + Math.cos(rotation) * 2,
        curvePoint.y + NAVIGATION.CAMERA_TILT,
        curvePoint.z + Math.cos(rotation) * 2
      );
      
      camera.lookAt(targetLookAt);
    }

    // Water animation scaled by delta time
    if (waterRef.current?.material) {
      time.current += delta * 0.5;
      const wave = Math.sin(time.current);
      waterRef.current.material.distortionScale = 3.5 + wave * 0.2;
      waterRef.current.material.mixStrength = 1.5 + Math.sin(time.current * 0.8) * 0.2;
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    const currentGroup = groupRef.current;
    return () => {
      if (currentGroup) {
        currentGroup.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  // Optimize Sky configuration
  const skyConfig = useMemo(() => ({
    turbidity: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
  }), []);

  // Memoize plant positions
  const plantPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 50; i++) {
      const radius = 20;
      const angle = (i / 50) * Math.PI * 2;
      const randomRadius = radius * (0.3 + Math.random() * 0.7);
      const x = Math.cos(angle) * randomRadius;
      const z = Math.sin(angle) * randomRadius;
      positions.push({ x, z });
    }
    return positions;
  }, []);

  const waterMaterialConfig = useMemo(() => ({
    blur: [400, 100],
    resolution: 1024,
    mixBlur: 1,
    mixStrength: 1.5,
    depthScale: 1.2,
    minDepthThreshold: 0.4,
    maxDepthThreshold: 1.4,
    metalness: 0.9,
    roughness: 0.1,
    mirror: 0.75,
    distortion: 1,
    distortionScale: 3.5,
    temporalDistortion: 0.1,
    color: "#006994",
    opacity: 0.85,
    transparent: true,
    side: THREE.DoubleSide
  }), []);

  const bloomConfig = useMemo(() => ({
    intensity: 0.4,
    luminanceThreshold: 0.7,
    luminanceSmoothing: 0.3,
    mipmapBlur: true
  }), []);

  useEffect(() => {
    const updateButtonPositions = () => {
      const boards = document.querySelectorAll('.section-board');
      const buttons = document.querySelectorAll('.navigation-button');

      boards.forEach((board, index) => {
        const rect = board.getBoundingClientRect();
        const button = buttons[index];
        if (button) {
          button.style.position = 'absolute';
          button.style.top = `${rect.top + window.scrollY + rect.height / 2}px`;
          button.style.left = `${rect.left + window.scrollX - button.offsetWidth - 10}px`;
        }
      });
    };

    window.addEventListener('resize', updateButtonPositions);
    updateButtonPositions();

    return () => {
      window.removeEventListener('resize', updateButtonPositions);
    };
  }, []);

  return (
    <>
      <Sky {...skyConfig} />

      {/* Optimize lighting with useMemo */}
      {useMemo(() => (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight
            position={SKY_CONFIG.SUNLIGHT_POSITION}
            intensity={0.6}
            castShadow={false}
          />
        </>
      ), [])}

      {/* Scene content */}
      <group ref={groupRef}>
        {/* Enhanced water surface with waves */}
        <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[100, 100, 64, 64]} />
          <MeshReflectorMaterial {...waterMaterialConfig} />
        </mesh>

        {/* Static distributed Bio-luminous plants */}
        {plantPositions.map((pos, i) => (
          <BioLuminousPlant 
            key={i} 
            position={[pos.x, -0.2, pos.z]} 
            colorIndex={i}
          />
        ))}

        <group ref={boatRef}>
          <FloatingBoat />
        </group>

        {/* Bio-luminous plants along the path */}
        {curve && Array(20).fill().map((_, i) => {
          try {
            const t = i / 19;
            const point = curve.getPoint(t);
            if (!point) return null;
            
            const offset = new THREE.Vector3(
              (Math.random() - 0.5) * 2,
              0,
              (Math.random() - 0.5) * 2
            );
            return (
              <BioLuminousPlant 
                key={i} 
                position={[
                  point.x + offset.x,
                  point.y,
                  point.z + offset.z
                ]} 
                colorIndex={i}
              />
            );
          } catch (error) {
            console.warn('Error creating bio-luminous plant:', error);
            return null;
          }
        })}

        {/* Content sections positioned along the path */}
        {NAVIGATION.PATH_POINTS.map((point, index) => {
          const position = new THREE.Vector3(...point.position);
          position.y += 1.5; // Adjusted height
          
          switch (point.section) {
            case 'start':
              return (
                <group key={index} position={position} rotation={[0, -Math.PI/2, 0]}>
                  <StartSection position={[0, 0, 0]} />
                </group>
              );
            case 'about':
              return (
                <group key={index} position={position} rotation={[0, -Math.PI/2, 0]}>
                  <AboutSection position={[0, 0, 0]} />
                </group>
              );
            case 'skills':
              return (
                <group key={index} position={position} rotation={[0, -Math.PI/2, 0]}>
                  <SkillsSection position={[0, 0, 0]} />
                </group>
              );
            case 'experience-qube':
              return (
                <group key={index} position={position} rotation={[0, -Math.PI/2, 0]}>
                  <ExperienceSection
                    position={[0, 0, 0]}
                    {...EXPERIENCE_DETAILS.qube}
                  />
                </group>
              );
            case 'experience-zoho':
              return (
                <group key={index} position={position} rotation={[0, -Math.PI/2, 0]}>
                  <ExperienceSection
                    position={[0, 0, 0]}
                    {...EXPERIENCE_DETAILS.zoho}
                  />
                </group>
              );
            case 'education':
              return (
                <group key={index} position={position} rotation={[0, -Math.PI/2, 0]}>
                  <Education position={[0, 0, 0]} />
                </group>
              );
            default:
              return null;
          }
        })}
      </group>

      {/* Optimized post-processing */}
      <EffectComposer multisampling={0}>
        <Bloom {...bloomConfig} />
      </EffectComposer>

      {/* Fixed position navigation buttons */}
      <Html style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <NavigationControls
          currentPathIndex={currentPathIndex}
          isTransitioning={isTransitioning}
          maxIndex={NAVIGATION.PATH_POINTS.length - 1}
          onPrev={moveToPreviousSection}
          onNext={moveToNextSection}
        />
      </Html>

      {/* Detailed experience section */}
      {selectedSection && (
        <DetailedExperienceSection
          experience={selectedSection}
          onClose={() => {
            setSelectedSection(null);
            handleSectionClick('overview');
          }}
        />
      )}
    </>
  );
}

export default React.memo(PlanetInterior);