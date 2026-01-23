"use client"

import { ParticleBackground } from "@/components/three/particle-background"
import { ModelViewer } from "@/components/three/model-viewer"
import { DistortedImage } from "@/components/three/distorted-image"
import { FloatingShapes } from "@/components/three/floating-shapes"

export default function ThreeDemoPage() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* 5. Usage of ParticleBackground */}
            <ParticleBackground count={200} scale={15} size={3} color="#4ade80" />

            <div className="z-10 flex flex-col gap-8 p-8 text-center bg-black/20 backdrop-blur-md rounded-lg border border-white/10">
                <h1 className="text-4xl font-bold text-white mb-4">Three.js Integration Demo</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-xl font-semibold text-white">Particle Background</h2>
                        <p className="text-gray-300 max-w-sm">
                            The background you see is the <code>ParticleBackground</code> component.
                            It uses efficient instanced rendering via <code>Sparkles</code>.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-xl font-semibold text-white">Model Viewer</h2>
                        <div className="w-64 h-64 bg-gray-900 rounded-lg border border-white/10 overflow-hidden relative">
                            {/* Note: Provide a valid path to a .glb/.gltf file in the public folder */}
                            {/* <ModelViewer path="/models/robot.glb" /> */}
                            <div className="flex items-center justify-center h-full text-gray-500 text-sm p-4">
                                Place a .glb model in public/ and uncomment the component to view it.
                            </div>
                        </div>
                        <p className="text-gray-300 max-w-sm">
                            The <code>ModelViewer</code> handles loading states, orbit controls, and environment lighting automatically.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-left bg-gray-900/80 p-4 rounded text-sm text-gray-300 font-mono overflow-x-auto">
                    <p className="text-green-400 font-bold mb-2">Usage Examples:</p>
                    <pre>{`// 1. Import components
import { ParticleBackground } from "@/components/three/particle-background"
import { ModelViewer } from "@/components/three/model-viewer"
import { DistortedImage } from "@/components/three/distorted-image"
import { FloatingShapes } from "@/components/three/floating-shapes"

// 2. Use in your page/component
<ParticleBackground color="#ffffff" count={100} />

// 3. View a 3D model
<ModelViewer path="/model.glb" className="h-96 w-full" />

// 4. Distorted Image on hover
<DistortedImage image="/image.jpg" className="h-64 w-64" />

// 5. Floating shapes background
<FloatingShapes />`}</pre>
                </div>
            </div>

            {/* New Components Demo Section */}
            <div className="z-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-8 pb-10">
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-xl font-semibold text-white">Distorted Image Shader</h2>
                    <div className="relative w-64 h-40 border border-white/10 rounded overflow-hidden">
                        <DistortedImage image="/abstract-neural-network-visualization-dark-theme.jpg" className="w-full h-full" />
                    </div>
                    <p className="text-gray-300 max-w-sm text-center">
                        Hover over the image (if available) to see the liquid distortion effect.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4 relative">
                    <h2 className="text-xl font-semibold text-white">Floating Shapes</h2>
                    <div className="w-64 h-40 border border-white/10 rounded relative overflow-hidden bg-black/50">
                        <FloatingShapes />
                    </div>
                    <p className="text-gray-300 max-w-sm text-center">
                        Geometric shapes floating with <code>Float</code> controls.
                    </p>
                </div>
            </div>
        </div>
    )
}
