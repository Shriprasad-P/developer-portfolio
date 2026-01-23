"use client"

import { Canvas } from "@react-three/fiber"
import { Sparkles } from "@react-three/drei"

interface ParticleBackgroundProps {
    count?: number
    scale?: number
    size?: number
    speed?: number
    color?: string
}

export function ParticleBackground({
    count = 100,
    scale = 10,
    size = 4,
    speed = 0.5,
    color = "#ffffff"
}: ParticleBackgroundProps) {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <Sparkles
                    count={count}
                    scale={scale}
                    size={size}
                    speed={speed}
                    opacity={0.5}
                    color={color}
                />
            </Canvas>
        </div>
    )
}
