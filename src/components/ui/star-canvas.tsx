"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = () => {
  const rotatingGroup = useRef<THREE.Group>(null);
  const interactiveGroup = useRef<THREE.Group>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    // Global spin
    if (rotatingGroup.current) {
      rotatingGroup.current.rotation.x -= delta / 10;
      rotatingGroup.current.rotation.y -= delta / 15;
    }

    // Mouse tilt
    if (interactiveGroup.current) {
      interactiveGroup.current.rotation.x += (mouse.current.y * 0.2 - interactiveGroup.current.rotation.x) * 0.05;
      interactiveGroup.current.rotation.y += (mouse.current.x * 0.2 - interactiveGroup.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={rotatingGroup} rotation={[0, 0, Math.PI / 4]}>
      <group ref={interactiveGroup}>
        <Points positions={sphere} stride={3} frustumCulled>
          <PointMaterial
            transparent
            color="#ffffff"
            size={0.002}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
      </group>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto fixed inset-0 z-[0] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
