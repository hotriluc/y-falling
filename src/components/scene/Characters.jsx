import * as THREE from "three";

import { useRef } from "react";
import { useGLTF, useAnimations, Mask, useMask } from "@react-three/drei";
import { useEffect } from "react";
import { useMemo } from "react";
import { MeshStandardMaterial } from "three";

const Characters = (props) => {
  const group = useRef();
  const maskRef = useRef();
  const { nodes, animations } = useGLTF("/characters.glb");
  const { actions, mixer } = useAnimations(animations, group);

  const stencilRed = useMask(1, true);
  const materialStencilRed = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new THREE.Color("#b34444"),
        stencilWrite: true,
        stencilRef: stencilRed.stencilRef,
        stencilFunc: stencilRed.stencilFunc,
        stencilFail: 7680,
        stencilZFail: 7680,
        stencilZPass: 7680,
      }),
    [stencilRed]
  );
  const stencilBlue = useMask(2, true);
  const materialStencilBlue = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new THREE.Color("#326cb9"),
        stencilWrite: true,
        stencilRef: stencilBlue.stencilRef,
        stencilFunc: stencilBlue.stencilFunc,
        stencilFail: 7680,
        stencilZFail: 7680,
        stencilZPass: 7680,
      }),
    [stencilBlue]
  );

  useEffect(() => {
    actions.yFire.play();
    actions.xFire.play();
  }, [mixer]);

  return (
    <>
      <Mask
        ref={maskRef}
        id={1}
        colorWrite
        position={[0, 1, 0]}
        rotation={[0.1, Math.PI / 4, 0]}
      >
        <planeGeometry args={[2, 2.6]} />
        <meshBasicMaterial side={THREE.DoubleSide} color={"#fefefe"} />
      </Mask>

      <Mask
        id={1}
        colorWrite
        position={[2, 5, 0]}
        rotation={[Math.PI / 2, -0.4, -0.01]}
      >
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial color={"#fefefe"} />
      </Mask>

      <Mask
        id={2}
        colorWrite
        position={[1.7, 1, -1]}
        rotation={[0, -0.5, Math.PI / 4]}
      >
        <planeGeometry args={[2, 2.6]} />
        <meshBasicMaterial side={THREE.DoubleSide} color={"#fefefe"} />
      </Mask>

      <group
        ref={group}
        {...props}
        dispose={null}
        rotation={[Math.PI / 2, Math.PI / 4, 0]}
      >
        <group name="Scene">
          <group
            name="Armature"
            rotation={[Math.PI / 1.35, 0, 0.5]}
            position={[0.5, 0, -0.4]}
            scale={0.01}
          >
            <skinnedMesh
              castShadow
              receiveShadow
              name="Beta_Joints"
              geometry={nodes.Beta_Joints.geometry}
              material={materialStencilRed}
              skeleton={nodes.Beta_Joints.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name="Beta_Surface"
              geometry={nodes.Beta_Surface.geometry}
              material={materialStencilBlue}
              skeleton={nodes.Beta_Surface.skeleton}
            />
            <primitive object={nodes.mixamorigHips} />
          </group>

          <group
            name="Armature001"
            rotation={[0.1, Math.PI - 0.5, 0]}
            position={[0, -0.8, 1.5]}
            scale={0.01}
          >
            <skinnedMesh
              castShadow
              receiveShadow
              name="Alpha_Joints"
              geometry={nodes.Alpha_Joints.geometry}
              material={materialStencilBlue}
              skeleton={nodes.Alpha_Joints.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name="Alpha_Surface"
              geometry={nodes.Alpha_Surface.geometry}
              material={materialStencilRed}
              skeleton={nodes.Alpha_Surface.skeleton}
            />
            <primitive object={nodes.mixamorigHips_1} />
          </group>
        </group>
      </group>
    </>
  );
};

useGLTF.preload("/characters.glb");
export default Characters;
