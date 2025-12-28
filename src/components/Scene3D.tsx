import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Configuration for easy customization
const SCENE_CONFIG = {
    // Sphere settings
    spheres: [
        { position: [2.5, 1.2, 0] as [number, number, number], scale: 1.2, color: '#0ea5e9' },      // Primary blue - top right
        { position: [-2.2, -0.8, -2] as [number, number, number], scale: 1.0, color: '#38bdf8' },   // Lighter blue - bottom left
        { position: [0, 2, -3] as [number, number, number], scale: 0.8, color: '#7dd3fc' },         // Soft blue - top center
        { position: [-3, 1.5, -1] as [number, number, number], scale: 0.6, color: '#0284c7' },      // Deep blue - left
    ],
    // Animation speeds (lower = slower, higher = faster)
    rotationSpeedX: 0.15,
    rotationSpeedY: 0.2,
    floatSpeed: 0.8,
    floatAmplitude: 0.3,
    // Material settings
    distort: 0.4,
    speed: 1.5,
    opacity: 0.18,
    roughness: 0.3,
    metalness: 0.7,
};

// Animated 3D sphere component
interface SphereProps {
    position: [number, number, number];
    scale?: number;
    color?: string;
}

const AnimatedSphere: React.FC<SphereProps> = ({ 
    position, 
    scale = 1, 
    color = '#0ea5e9' 
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialY = position[1];

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            // Rotation animation
            meshRef.current.rotation.x = time * SCENE_CONFIG.rotationSpeedX;
            meshRef.current.rotation.y = time * SCENE_CONFIG.rotationSpeedY;
            // Floating animation
            meshRef.current.position.y = initialY + Math.sin(time * SCENE_CONFIG.floatSpeed) * SCENE_CONFIG.floatAmplitude;
        }
    });

    return (
        <Sphere ref={meshRef} args={[scale, 64, 64]} position={position}>
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={SCENE_CONFIG.distort}
                speed={SCENE_CONFIG.speed}
                roughness={SCENE_CONFIG.roughness}
                metalness={SCENE_CONFIG.metalness}
                transparent
                opacity={SCENE_CONFIG.opacity}
            />
        </Sphere>
    );
};

// 3D Background Scene
export const Scene3D: React.FC = () => {
    return (
        <div className="absolute inset-0 -z-10 opacity-50">
            <Canvas camera={{ position: [0, 0, 6], fov: 70 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={0.8} />
                <pointLight position={[-10, -10, -5]} intensity={0.3} color="#38bdf8" />
                {SCENE_CONFIG.spheres.map((sphere, index) => (
                    <AnimatedSphere
                        key={index}
                        position={sphere.position}
                        scale={sphere.scale}
                        color={sphere.color}
                    />
                ))}
            </Canvas>
        </div>
    );
};
