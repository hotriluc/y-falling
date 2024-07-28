import * as THREE from "three";

import { shaderMaterial } from "@react-three/drei";

import smallFlareFragmentShader from "../../shaders/flare-small/fragment.glsl";
import smallFlareVertexShader from "../../shaders/flare-small/vertex.glsl";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { useRef } from "react";

const SmallFlareMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    uColor: new THREE.Color("red"),
    uLength: 0.01,
    uThickness: 1,
    uRotation: 0,
  },
  smallFlareVertexShader,
  smallFlareFragmentShader
);

extend({ SmallFlareMaterial });

const SmallFlares = ({ position, rotation = 0, count = 40 }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    const distance = 1;

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      let x = distance * Math.sin(theta) * Math.cos(phi);
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    const et = state.clock.getElapsedTime();

    materialRef.current.uniforms.uTime.value = et;
  });

  return (
    <points position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>

      <smallFlareMaterial
        ref={materialRef}
        transparent
        blending={THREE.AdditiveBlending}
        depthTest={false}
        uResolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        uRotation={rotation}
      />
    </points>
  );
};

export default SmallFlares;
