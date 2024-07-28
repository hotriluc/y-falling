import * as THREE from "three";

import { shaderMaterial } from "@react-three/drei";

import bigFlareFragmentShader from "../../shaders/flare-big/fragment.glsl";
import bigFlareVertexShader from "../../shaders/flare-big/vertex.glsl";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { useRef } from "react";

const BigFlareMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    uColorOne: new THREE.Color("#ff004c"),
    uColorTWo: new THREE.Color("#0026ff"),
    uLength: 0.02,
    uThickness: 0.4,
    uRotation: 0,
    uClockwise: 1,
    uXFrequency: 16,
    uYFrequency: 24,
  },
  bigFlareVertexShader,
  bigFlareFragmentShader
);

extend({ BigFlareMaterial });

const BigFlare = ({
  position,
  rotation,
  length = 0.02,
  thickness = 0.4,
  clockwise = 1,
  xFrequency = 16,
  yFrequency = 24,
}) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const particlesPosition = useMemo(
    () => new Float32Array(position),
    [position]
  );

  useFrame((state) => {
    const et = state.clock.getElapsedTime();

    materialRef.current.uniforms.uTime.value = et;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <bigFlareMaterial
        ref={materialRef}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        colorWrite
        uResolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        uRotation={rotation}
        uLength={length}
        uThickness={thickness}
        uClockwise={clockwise}
        uXFrequency={xFrequency}
        uYFrequency={yFrequency}
      />
    </points>
  );
};

export default BigFlare;
