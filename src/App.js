import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Outlines, Environment, Lightformer, useTexture, MeshTransmissionMaterial, Edges } from '@react-three/drei'
import { easing } from 'maath'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
      <color attach="background" args={['white']} />
      <Model scale={0.4} rotation={[-Math.PI / 4, -0.5, 0.5]} position={[0, 0, 2]} />
      <Floor />
      <Environment preset="night">
        <group rotation={[1, 0, 0]}>
          <Lightformer intensity={1} position={[0, 10, -10]} scale={[10, 100, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          <Lightformer intensity={0.1} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[50, 10, 1]} />
          <Lightformer intensity={100} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 1, 0]} rotation-y={-Math.PI / 2} scale={[50, 10, 1]} />
          <Lightformer intensity={1} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[0, 1, 0]} scale={[10, 100, 1]} />
        </group>
      </Environment>
      {/* <Rig /> */}
    </Canvas>
  )
}

function Model(props) {
  const ref = useRef()
  const { nodes } = useGLTF('/shape.glb')
  useFrame((state, delta) => (ref.current.rotation.x += delta / 3))
  return (
    <group {...props} dispose={null}>
      <mesh ref={ref} geometry={nodes.Cylinder.geometry}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={-3}
          thickness={3}
          chromaticAberration={0.1}
          anisotropicBlur={0.01}
          iridescence={1}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[0, 1400]}
          clearcoatRoughness={0}
          clearcoat={0.1}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  )
}

function Floor() {
  const texture = useTexture('/Checkerboard_pattern.png')
  return (
    <mesh scale={5}>
      <planeGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
