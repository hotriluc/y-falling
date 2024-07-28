import * as THREE from "three";

import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Lighting = () => {
  const spotLightRef = useRef();
  const directionalLightRef = useRef();
  const skillPointLightRef = useRef();
  const skillPointLightRef2 = useRef();
  const skillPointLightRef3 = useRef();

  // useHelper(spotLightRef, THREE.SpotLightHelper);
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper);
  // useHelper(skillPointLightRef4, THREE.PointLightHelper);

  // Animate light
  useFrame((state) => {
    const et = state.clock.getElapsedTime();
    skillPointLightRef.current.intensity = 15 * (1 + Math.sin(et * 24) * 0.5);
    skillPointLightRef2.current.intensity = 1 * (1 + Math.sin(et * 24) * 0.5);
    skillPointLightRef3.current.intensity = 1 + Math.sin(et * 24) * 0.5;
    // skillPointLightRef4.current.intensity = 1 + Math.sin(et * 24) * 0.5;
  });

  return (
    <>
      <ambientLight intensity={1.2} color={"#006eff"} />
      <pointLight
        ref={skillPointLightRef}
        castShadow
        position={[0.85, -0.5, 0.7]}
        color={"#ff004c"}
        decay={4}
      />

      <pointLight
        ref={skillPointLightRef2}
        // castShadow
        position={[1, -0.5, 0.5]}
        intensity={20}
        decay={4}
      />
      <pointLight
        ref={skillPointLightRef3}
        castShadow
        position={[1, -2, 0.0]}
        decay={8}
      />

      {/* <pointLight
        ref={skillPointLightRef4}
        castShadow
        position={[1, -2, -0.5]}
      /> */}
      <directionalLight
        ref={directionalLightRef}
        intensity={90.2}
        position={[2, 5, 0]}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.000001}
      />
    </>
  );
};

export default Lighting;
