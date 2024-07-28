import { Canvas } from "@react-three/fiber";
import Overlay from "./components/overlay/Overlay";
import Scene from "./components/scene/Scene";
import { Loader } from "@react-three/drei";

const App = () => {
  return (
    <>
      <Overlay />
      <Canvas
        flat
        linear
        shadows
        camera={{
          position: [0.2, -2.5, 4.2],
        }}
      >
        <Scene />
      </Canvas>
      <Loader />
    </>
  );
};

export default App;
