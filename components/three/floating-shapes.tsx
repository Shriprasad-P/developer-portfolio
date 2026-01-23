"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Icosahedron, Torus, Octahedron } from "@react-three/drei"
import type { Group } from "three"
import gsap from "gsap"

function Shapes() {
    const groupRef = useRef<Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            // Base rotation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
            // Scroll influence (simple global scroll, or we can use ScrollTrigger proxy if we want more control)
            // For now, let's just keep continuous rotation, but we can access scroll via window.scrollY for simple interactive speedup 
            // OR simply rely on the fact that this component is in a section that is being viewed.
        }
    })

    // GSAP ScrollTrigger for additional rotation or movement
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (groupRef.current) {
                gsap.to(groupRef.current.rotation, {
                    y: "+=2", // Rotate significantly over the course of the scroll
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1
                    }
                })
            }
        })
        return () => ctx.revert()
    }, [])

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <Icosahedron args={[1, 0]} position={[-2, 2, 0]} scale={0.5}>
                    <meshStandardMaterial color="#4ade80" wireframe />
                </Icosahedron>

                <Torus args={[1.5, 0.2, 16, 32]} position={[3, -1, -2]} rotation={[0.5, 0, 0]}>
                    <meshStandardMaterial color="#60a5fa" wireframe />
                </Torus>

                <Octahedron args={[1, 0]} position={[-3, -2, -1]}>
                    <meshStandardMaterial color="#f472b6" wireframe />
                </Octahedron>
            </Float>
        </group>
    )
}

export function FloatingShapes() {
    return (
        <div className="absolute inset-0 pointer-events-none -z-[5]">
            <Canvas camera={{ position: [0, 0, 8] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Shapes />
            </Canvas>
        </div>
    )
}
