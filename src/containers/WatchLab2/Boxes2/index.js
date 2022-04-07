import { Canvas, extend, useFrame } from "@react-three/fiber";
//import { TextureLoader } from "three/src/loaders/TextureLoader";
import Loading from "../Loading";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import BlueBox from "./BlueBox";
//import test from "../../../assets/teste.jpg";

import React, { useRef, Suspense, useState, useEffect } from "react";

extend({ OrbitControls });

const MyMesh = ({ render }) => {
  const mesh = useRef();

  useFrame(() => {
    // rotates the object
    mesh.current.rotation.y = mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={mesh} receiveShadow castShadow position={[0, -1, 0]}>
      {render && <BlueBox />}
    </mesh>
  );
};

const Boxes = ({ x }) => {
  const [render, setRender] = useState(false);
  const configMesh = { render };

  useEffect(() => {
    if (x === 0 || x === -200) {
      setTimeout(() => {
        setRender(false);
      }, 1000);
    }
    if (x === -100) {
      setRender(true);
    }
  }, [x]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      shadowMap
      sRGB
      colorManagement
      camera={{ position: [30, 50, 200], fov: 1.5 }}
    >
      <Suspense fallback={<Loading />}>
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[0, 30, 20]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <spotLight
          position={[10, 0, 0]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />

        <MyMesh {...configMesh} />
      </Suspense>
    </Canvas>
  );
};
export default Boxes;

/* <meshStandardMaterial map={colorMap} />
			<sphereGeometry args={[1, 32, 32]} />
const colorMap = useLoader(TextureLoader, test); */
