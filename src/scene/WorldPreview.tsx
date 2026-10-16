import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { PCFShadowMap, type Mesh } from 'three';
import { WORLD } from '../config';
import { useReducedMotion } from '../hooks';

function SpinningBox({ paused }: { paused: boolean }) {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current && !paused) {
      mesh.current.rotation.y += Math.min(delta, 0.1) * WORLD.spinRadiansPerSecond;
    }
  });

  return (
    <RoundedBox
      ref={mesh}
      args={[WORLD.boxSize, WORLD.boxSize, WORLD.boxSize]}
      radius={WORLD.boxRadius}
      smoothness={5}
      rotation={[0.12, 0.5, 0.04]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={WORLD.grass} roughness={0.7} metalness={0} />
    </RoundedBox>
  );
}

export function WorldPreview() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      shadows={{ type: PCFShadowMap }}
      dpr={[1, 2]}
      camera={{ position: [3.8, 2.6, 5.5], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      fallback={<p className="p-8 text-center">Your browser needs WebGL to show this little world.</p>}
    >
      <ambientLight intensity={1.1} />
      <hemisphereLight args={['#ffffff', '#8aa783', 1.5]} />
      <directionalLight
        position={[-3, 6, 4]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-normalBias={0.04}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <SpinningBox paused={reducedMotion} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <shadowMaterial transparent opacity={0.13} />
      </mesh>
    </Canvas>
  );
}
