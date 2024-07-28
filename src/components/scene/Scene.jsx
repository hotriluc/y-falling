import { PresentationControls, SoftShadows } from "@react-three/drei";
import BigFlare from "./BigFlare";
import Characters from "./Characters";
import { Suspense } from "react";
import Lighting from "./Lightning";

const Scene = () => {
  return (
    <>
      <SoftShadows size={6} focus={15} samples={8} />

      <PresentationControls
        polar={[-0.5, Math.PI / 2]}
        azimuth={[-0.5, 2.5]}
        global
      >
        <group
          scale={1.2}
          position={[-1, 0, 0]}
          rotation={[-Math.PI / 2.4, 0.15, 0]}
        >
          <Lighting />

          <Suspense fallback={null}>
            <Characters />
          </Suspense>

          <BigFlare position={[0.85, -0.5, 0.7]} rotation={0.33} />
          <BigFlare
            position={[0.85, -0.5, 0.7]}
            thickness={0.8}
            length={0.02}
            clockwise={-1}
          />
          <BigFlare
            position={[0.85, -0.5, 0.7]}
            thickness={0.5}
            length={0.001}
            rotation={0.15}
            clockwise={-1}
          />
          <BigFlare
            position={[0.85, -0.5, 0.7]}
            thickness={0.4}
            length={0.005}
            rotation={0.99}
          />
        </group>
        {/* <BigFlare position={[1.35, -2.1, 0.1]} rotation={0.33} /> */}
      </PresentationControls>
    </>
  );
};

export default Scene;
