// components/GLBViewer.tsx
'use client'

import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

interface Props {
  url: string
}

export default function ModelViewer({ url }: Props) {
  const { scene } = useGLTF(url)

  return (
    <Canvas camera={{ fov: 5, position: [5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <primitive object={scene} />
    </Canvas>
  )
}
