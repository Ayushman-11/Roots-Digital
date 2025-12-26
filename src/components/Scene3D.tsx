import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Animated 3D sphere component
const AnimatedSphere: React.FC<{ position: [number, number, number] }> = ({ position }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Sphere ref={meshRef} args={[1, 100, 100]} position={position}>
            <MeshDistortMaterial
                color="#0ea5e9"
                attach="material"
                distort={0.3}
                speed={2}
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.15}
            />
        </Sphere>
    );
};

// 3D Background Scene
export const Scene3D: React.FC = () => {
    return (
        <div className="absolute inset-0 -z-10 opacity-40">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedSphere position={[2, 1, 0]} />
                <AnimatedSphere position={[-2, -1, -2]} />
            </Canvas>
        </div>
    );
};
