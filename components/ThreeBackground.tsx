"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CyberScene({ mousePos }: { mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const wireframeSphereRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  // Create particles geometry
  const [particleCount] = useState(450);
  const [positions] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Rotate main 3D object smoothly
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + mousePos.y * 0.4;
      meshRef.current.rotation.y = t * 0.25 + mousePos.x * 0.4;
    }

    if (wireframeSphereRef.current) {
      wireframeSphereRef.current.rotation.x = -t * 0.15;
      wireframeSphereRef.current.rotation.y = t * 0.3;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.1;
    }

    // Rotate particle system slowly
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.04;
      particlesRef.current.rotation.x = Math.sin(t * 0.02) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#d7ff3f" />
      <pointLight position={[mousePos.x * 10, mousePos.y * 10, 4]} intensity={2} color="#00f0ff" />

      {/* Main Glowing 3D Torus Knot */}
      <mesh ref={meshRef} position={[2.5, 0.5, -2]} scale={1.1}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
        <meshStandardMaterial
          color="#15171e"
          roughness={0.2}
          metalness={0.9}
          wireframe={false}
          emissive="#1a2510"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Inner Wireframe Overlay */}
      <mesh ref={wireframeSphereRef} position={[2.5, 0.5, -2]} scale={1.8}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#d7ff3f" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Outer Cyber Ring */}
      <mesh ref={ringRef} position={[2.5, 0.5, -2]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.25} wireframe />
      </mesh>

      {/* Particle Field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#d7ff3f"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) {
    return <div className="canvas-fallback" />;
  }

  return (
    <div className="three-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
      >
        <CyberScene mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
