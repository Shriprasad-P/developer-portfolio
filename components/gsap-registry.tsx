"use client"

import { useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function GSAPRegistry() {
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
    }, [])

    return null
}
