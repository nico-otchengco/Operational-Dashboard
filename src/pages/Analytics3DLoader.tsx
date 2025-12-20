import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

const AnimatedLine = () => {
  const ref = useRef<THREE.Line>(null);

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      if (ref.current) {
        ref.current.rotation.y += 0.003;
        ref.current.rotation.x += 0.002;
      }
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <Line
      ref={ref}
      points={[
        [-3, 0, 0],
        [-2, 1, 0],
        [-1, -1, 0],
        [0, 2, 0],
        [1, -1, 0],
        [2, 1, 0],
        [3, 0, 0],
      ]}
      color="#3b82f6"
      lineWidth={2}
    />
  );
};

export const Analytics3DLoader = () => {
  return (
    <div className="loader-overlay">
      <Canvas
        dpr={[1, 1.5]} 
        gl={{ antialias: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 8], fov: 60 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <AnimatedLine />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate />
        </Suspense>
      </Canvas>

      <p className="loader-text">
        Initializing analytics engine…
      </p>
    </div>
  );
};
