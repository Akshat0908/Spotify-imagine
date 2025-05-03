
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";

interface GenreVisualizerProps {
  selectedGenre: string;
  mousePosition: { x: number; y: number };
}

// Custom Scene Component inside Three.js Canvas
const Scene = ({ selectedGenre, mousePosition }: GenreVisualizerProps) => {
  const { camera } = useThree();
  const particleRef = useRef<THREE.Points>(null);
  const waveRef = useRef<THREE.Mesh>(null);
  
  // Update scene based on mouse position and selected genre
  useFrame(() => {
    if (particleRef.current) {
      particleRef.current.rotation.y += 0.001;
      particleRef.current.rotation.x += 0.0005;
      
      // Change particle color based on genre
      const particles = particleRef.current.geometry.attributes.color as THREE.BufferAttribute;
      
      if (selectedGenre) {
        let r = 0, g = 0, b = 0;
        
        // Map genre to color
        switch (selectedGenre.toLowerCase()) {
          case "pop":
            r = 1; g = 0.2; b = 0.5; break; // Pink
          case "rock":
            r = 0.7; g = 0.2; b = 0.2; break; // Red
          case "hip-hop":
            r = 0.2; g = 0.2; b = 0.8; break; // Blue
          case "r&b":
            r = 0.8; g = 0.5; b = 0.8; break; // Purple
          case "latin":
            r = 1; g = 0.8; b = 0.2; break; // Yellow
          case "electronic":
            r = 0.2; g = 0.8; b = 0.8; break; // Cyan
          case "country":
            r = 0.8; g = 0.6; b = 0.2; break; // Orange/Brown
          default:
            r = 0.1; g = 0.7; b = 0.3; break; // Default Spotify green
        }
        
        for (let i = 0; i < particles.count; i++) {
          particles.setXYZ(i, r, g, b);
        }
        particles.needsUpdate = true;
      }
    }
    
    if (waveRef.current) {
      // Update wave animation
      waveRef.current.rotation.z += 0.01;
      
      // Make the wave respond to mouse position
      waveRef.current.position.x = (mousePosition.x / window.innerWidth - 0.5) * 2;
      waveRef.current.position.y = -(mousePosition.y / window.innerHeight - 0.5) * 2;
    }
    
    // Move camera slightly with mouse
    camera.position.x += (mousePosition.x / window.innerWidth - 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-(mousePosition.y / window.innerHeight - 0.5) - camera.position.y) * 0.05;
  });
  
  // When genre changes, create a ripple effect
  useEffect(() => {
    if (waveRef.current && selectedGenre) {
      waveRef.current.scale.set(0.1, 0.1, 0.1);
      
      // Animate wave scale
      const animateWave = () => {
        if (waveRef.current) {
          waveRef.current.scale.x += 0.1;
          waveRef.current.scale.y += 0.1;
          waveRef.current.scale.z += 0.1;
          
          if (waveRef.current.scale.x < 3) {
            requestAnimationFrame(animateWave);
          } else {
            waveRef.current.scale.set(0.1, 0.1, 0.1);
          }
        }
      };
      
      animateWave();
    }
  }, [selectedGenre]);
  
  // Create particles
  const particleCount = 1000;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Random positions in a sphere
    const radius = 4 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i+1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i+2] = radius * Math.cos(phi);
    
    // Default Spotify green
    particleColors[i] = 0.1;
    particleColors[i+1] = 0.7;
    particleColors[i+2] = 0.3;
  }
  
  // Create geometry with positions and colors
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  
  return (
    <>
      {/* Particles */}
      <points ref={particleRef} frustumCulled={false}>
        <bufferGeometry attach="geometry" {...particlesGeometry} />
        <pointsMaterial
          attach="material"
          size={0.1}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Sound wave rings */}
      <mesh ref={waveRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.8, 32]} />
        <meshBasicMaterial color="#1DB954" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Central sphere (like a playing disc) */}
      {selectedGenre && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial 
            color="#1DB954" 
            roughness={0.2}
            metalness={0.8}
            emissive="#1DB954"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
      
      {/* Ambient light */}
      <ambientLight intensity={0.4} />
      
      {/* Directional light */}
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
    </>
  );
};

const GenreVisualizer = ({ selectedGenre, mousePosition }: GenreVisualizerProps) => {
  return (
    <Canvas style={{ background: 'transparent' }}>
      <Scene selectedGenre={selectedGenre} mousePosition={mousePosition} />
      <Environment preset="night" />
    </Canvas>
  );
};

export default GenreVisualizer;
