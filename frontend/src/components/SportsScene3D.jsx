import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { Sphere, Cylinder, Float } from '@react-three/drei'
import { useRef } from 'react'

// Cricket Ball
function CricketBall() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[0.3, 32, 32]} position={[2, 1, 0]}>
        <meshStandardMaterial color="#b22222" roughness={0.4} metalness={0.1} />
      </Sphere>
    </Float>
  )
}

// Football
function Football() {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
      <Sphere args={[0.5, 32, 32]} position={[-2, 0.5, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </Sphere>
    </Float>
  )
}

// Cricket Bat (simple box shape)
function CricketBat() {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={[0, 0, 0]} rotation={[0, 0, -0.4]}>
        {/* Blade */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.4, 1.5, 0.08]} />
          <meshStandardMaterial color="#c8a96e" roughness={0.5} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.8, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>
    </Float>
  )
}

export default function SportsScene3D() {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4466ff" />
        <CricketBat />
        <CricketBall />
        <Football />
      </Canvas>
    </div>
  )
}