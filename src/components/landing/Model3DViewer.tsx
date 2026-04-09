import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sphere, Torus, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hook: device orientation (gyroscope) on mobile, mouse on desktop.
 * Returns normalized rotation values (-1 to 1).
 */
const useInteractiveRotation = () => {
  const rotation = useRef({ x: 0, y: 0 });
  const [hasGyro, setHasGyro] = useState(false);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        setHasGyro(true);
        rotation.current.x = THREE.MathUtils.clamp((e.beta - 45) / 45, -1, 1);
        rotation.current.y = THREE.MathUtils.clamp(e.gamma / 45, -1, 1);
      }
    };

    const handleMouse = (e: MouseEvent) => {
      if (hasGyro) return;
      rotation.current.x = (e.clientY / window.innerHeight - 0.5) * 2;
      rotation.current.y = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    const handleTouch = (e: TouchEvent) => {
      if (hasGyro) return;
      const t = e.touches[0];
      rotation.current.x = (t.clientY / window.innerHeight - 0.5) * 2;
      rotation.current.y = (t.clientX / window.innerWidth - 0.5) * 2;
    };

    // Request permission for iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any).requestPermission().then((state: string) => {
        if (state === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      }).catch(() => {});
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, [hasGyro]);

  return rotation;
};

/** Stylized figure silhouette — represents one musician */
const MusicianFigure = ({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef} position={position}>
        {/* Head */}
        <Sphere args={[0.22, 32, 32]} position={[0, 1.55, 0]}>
          <MeshDistortMaterial
            color="#c9953c"
            roughness={0.3}
            metalness={0.8}
            distort={0.05}
            speed={2}
          />
        </Sphere>
        {/* Hat */}
        <mesh position={[0, 1.78, 0]}>
          <cylinderGeometry args={[0.3, 0.28, 0.12, 32]} />
          <meshStandardMaterial color="#8b6914" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, 1.72, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.03, 32]} />
          <meshStandardMaterial color="#8b6914" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Body */}
        <RoundedBox args={[0.5, 0.8, 0.3]} radius={0.08} position={[0, 0.9, 0]}>
          <meshStandardMaterial color="#1a1510" roughness={0.6} metalness={0.3} />
        </RoundedBox>
        {/* Guitar body */}
        <group position={[0.15, 0.7, 0.2]} rotation={[0, 0, 0.3]}>
          <Sphere args={[0.18, 16, 16]} scale={[1, 1.3, 0.4]}>
            <meshStandardMaterial color="#5c3a1e" roughness={0.5} metalness={0.4} />
          </Sphere>
          {/* Neck */}
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[0.04, 0.5, 0.03]} />
            <meshStandardMaterial color="#3d2510" roughness={0.6} metalness={0.2} />
          </mesh>
        </group>
        {/* Legs */}
        <mesh position={[-0.12, 0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.6, 8]} />
          <meshStandardMaterial color="#0f0d0a" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0.12, 0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.6, 8]} />
          <meshStandardMaterial color="#0f0d0a" roughness={0.7} metalness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

/** Rotating ring accents */
const GoldenRing = ({ radius, y, speed }: { radius: number; y: number; speed: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return (
    <Torus ref={ref} args={[radius, 0.008, 16, 100]} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#c9953c" roughness={0.2} metalness={0.9} transparent opacity={0.4} />
    </Torus>
  );
};

/** The full 3D scene that reacts to gyroscope/mouse */
const Scene = () => {
  const rotation = useInteractiveRotation();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const targetX = rotation.current.x * 0.3;
      const targetY = rotation.current.y * 0.4;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#c9953c" />
      <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#4a7ab5" />
      <pointLight position={[0, 3, 2]} intensity={0.8} color="#daa520" distance={10} />
      <spotLight position={[0, 6, 0]} angle={0.4} penumbra={0.8} intensity={1.5} color="#c9953c" />

      <group ref={groupRef}>
        {/* Three musicians */}
        <MusicianFigure position={[-1.2, -1, 0]} delay={0} />
        <MusicianFigure position={[0, -0.8, 0.3]} delay={0.5} />
        <MusicianFigure position={[1.2, -1, 0]} delay={1} />

        {/* Decorative rings */}
        <GoldenRing radius={2} y={-0.5} speed={0.15} />
        <GoldenRing radius={2.5} y={0.5} speed={-0.1} />
        <GoldenRing radius={1.5} y={1.5} speed={0.2} />

        {/* Stage platform */}
        <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.5, 64]} />
          <meshStandardMaterial color="#1a1510" roughness={0.8} metalness={0.3} transparent opacity={0.6} />
        </mesh>
      </group>

      <Environment preset="night" />
    </>
  );
};

const Model3DViewer = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[550px] relative">
      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20" style={{ background: "var(--gradient-radial-gold)" }} />
      </div>

      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Instruction label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 glass-panel px-4 py-1.5 rounded-full">
          Mova o celular ou mouse para interagir
        </span>
      </div>
    </div>
  );
};

export default Model3DViewer;
