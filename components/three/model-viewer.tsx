"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage, useGLTF } from "@react-three/drei"
import { Loader2 } from "lucide-react"

interface ModelProps {
    path: string
    scale?: number
    autoRotate?: boolean
}

function Model({ path, scale = 1, autoRotate }: ModelProps) {
    const { scene } = useGLTF(path)

    return (
        <Stage environment="city" intensity={0.6}>
            <primitive object={scene} scale={scale} />
        </Stage>
    )
}

function LoadingSpinner() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    )
}

export function ModelViewer({ path, className, scale = 1, autoRotate = true }: ModelProps & { className?: string }) {
    return (
        <div className={className}>
            <Suspense fallback={<LoadingSpinner />}>
                <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
                    <Model path={path} scale={scale} autoRotate={autoRotate} />
                    <OrbitControls autoRotate={autoRotate} />
                </Canvas>
            </Suspense>
        </div>
    )
}
