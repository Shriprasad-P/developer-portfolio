"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import { MathUtils, Vector2 } from "three"
import type { Mesh, ShaderMaterial } from "three"

// Shaders
const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uHover;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Subtle wave movement
  float freq = 2.0;
  float amp = 0.05;
  pos.z += sin(pos.y * freq + uTime) * amp * uHover;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHover;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Liquid distortion effect
  float noise = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 + uTime) * 0.02;
  uv.x += noise * uHover;
  uv.y += noise * uHover;
  
  vec4 color = texture2D(uTexture, uv);
  
  // RGB Shift on hover
  float shift = 0.01 * uHover;
  color.r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
  color.b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
  
  gl_FragColor = color;
}
`

interface ImageMeshProps {
    url: string
    hovered: boolean
}

function ImageMesh({ url, hovered }: ImageMeshProps) {
    const meshRef = useRef<Mesh>(null)
    const materialRef = useRef<ShaderMaterial>(null)
    const texture = useTexture(url)
    const { viewport } = useThree()

    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uHover: { value: 0 },
            uTime: { value: 0 },
            uResolution: { value: new Vector2(1, 1) },
        }),
        [texture],
    )

    useFrame((state) => {
        if (materialRef.current) {
            // Smoothly animate hover value
            materialRef.current.uniforms.uHover.value = MathUtils.lerp(
                materialRef.current.uniforms.uHover.value,
                hovered ? 1 : 0,
                0.1
            )
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    )
}

interface DistortedImageProps {
    image: string
    isHovered?: boolean
    className?: string
}

export function DistortedImage({ image, isHovered = false, className }: DistortedImageProps) {
    return (
        <div className={className}>
            <Canvas>
                <ImageMesh url={image} hovered={isHovered} />
            </Canvas>
        </div>
    )
}
