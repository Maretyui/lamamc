"use client"

import { Suspense, useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, Float } from "@react-three/drei"
import * as THREE from "three"
import Image from "next/image"

const spielmodiData = [
  {
    id: 1,
    title: "Survival",
    subtitle: "Klassisches Abenteuer.",
    description:
      "Erlebe klassisches Survival mit Custom Items, Clans und einer lebendigen Welt. Baue, kämpfe und überlebe mit Freunden.",
    image: "/images/servers/survival.png",
    color: "#4ade80",
  },
  {
    id: 2,
    title: "GoldPVP",
    subtitle: "Kämpfe um Gold.",
    description:
      "Kämpfe in einem intensiven PvP-Modus um Gold-Coins zum Gear-Upgrade. Zeige deine Skills und werde der beste Kämpfer.",
    image: "/images/servers/goldpvp.png",
    color: "#fbbf24",
  },
  {
    id: 3,
    title: "Duels",
    subtitle: "1v1 Herausforderung.",
    description:
      "Fordere Freunde zu spannenden 1v1-Duellen heraus und verbessere deine PvP-Skills in fairen Kämpfen.",
    image: "/images/servers/duels.png",
    color: "#f87171",
  },
  {
    id: 4,
    title: "Realms",
    subtitle: "Deine eigene Welt.",
    description:
      "Baue und teile deine eigene Welt mit Freunden. Gestalte alles nach deinen Wünschen in unserem Realms-Modus.",
    image: "/images/servers/realms.png",
    color: "#60a5fa",
  },
]

interface MacBookProps {
  index: number
  activeIndex: number
  scrollProgress: number
}

function MacBook({ index, activeIndex, scrollProgress }: MacBookProps) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  const { scene } = useGLTF("/Mac.glb")
  
  // Create a unique clone for each MacBook
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone()
      }
    })
    return clone
  }, [scene])

  // Calculate positions based on active state
  const isActive = index === activeIndex
  const isPast = index < activeIndex
  const isFuture = index > activeIndex

  useFrame((_, delta) => {
    if (!groupRef.current) return
    
    // Accumulate time manually to avoid THREE.Clock deprecation
    timeRef.current += delta

    // Target positions
    let targetY = 0
    let targetZ = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let targetScale = 1

    if (isActive) {
      // Active MacBook - front and center, slightly tilted
      targetY = 0
      targetZ = 0
      targetRotationX = -0.1
      targetRotationY = Math.sin(timeRef.current * 0.5) * 0.05
      targetScale = 1
    } else if (isPast) {
      // Past MacBooks - move up and back
      const offset = activeIndex - index
      targetY = 2 + offset * 0.5
      targetZ = -2 - offset * 0.5
      targetRotationX = -0.8
      targetScale = 0.8 - offset * 0.1
    } else if (isFuture) {
      // Future MacBooks - stacked below
      const offset = index - activeIndex
      targetY = -1.5 - offset * 0.3
      targetZ = -0.5 - offset * 0.5
      targetRotationX = 0.3
      targetScale = 0.9 - offset * 0.05
    }

    // Smooth interpolation
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 3
    )
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 3
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      delta * 3
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      delta * 3
    )
    const currentScale = groupRef.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 3)
    groupRef.current.scale.setScalar(newScale)
  })

  return (
    <group ref={groupRef} position={[0, -1.5 - index * 0.3, -0.5 - index * 0.5]}>
      <primitive object={clonedScene} scale={2} />
    </group>
  )
}

function Scene({ activeIndex, scrollProgress }: { activeIndex: number; scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      <Environment preset="city" />
      
      {spielmodiData.map((_, index) => (
        <MacBook
          key={index}
          index={index}
          activeIndex={activeIndex}
          scrollProgress={scrollProgress}
        />
      ))}
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export function SpielmodeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = containerRef.current.offsetHeight

      // Calculate scroll progress (0 to 1) for this section
      const scrolled = -rect.top
      const totalScrollable = sectionHeight - windowHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))

      setScrollProgress(progress)

      // Calculate active index based on progress
      const newActiveIndex = Math.min(
        spielmodiData.length - 1,
        Math.floor(progress * spielmodiData.length)
      )
      setActiveIndex(newActiveIndex)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const currentItem = spielmodiData[activeIndex]

  return (
    <section
      id="spielmodi"
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${spielmodiData.length * 100 + 50}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Text content - Left side */}
        <div className="z-10 w-full px-6 md:w-1/2 md:px-12 lg:px-20">
          <div className="max-w-xl">
            {/* Section header */}
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
              Spielmodi
            </p>

            {/* Dynamic content */}
            <div className="relative min-h-[280px]">
              {spielmodiData.map((item, index) => (
                <div
                  key={item.id}
                  className={`transition-all duration-700 ease-out ${
                    index === activeIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none absolute inset-0 translate-y-8 opacity-0"
                  }`}
                >
                  <h2
                    className="mb-3 text-xl font-bold md:text-2xl"
                    style={{ color: item.color }}
                  >
                    {item.subtitle}
                  </h2>
                  <h3 className="mb-5 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Screenshot preview on mobile */}
            <div className="mt-8 overflow-hidden rounded-xl border border-border/50 md:hidden">
              <div className="relative aspect-video">
                {spielmodiData.map((item, index) => (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${
                      index === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress indicators */}
            <div className="mt-10 flex gap-2">
              {spielmodiData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (containerRef.current) {
                      const sectionTop = containerRef.current.offsetTop
                      const sectionHeight = containerRef.current.offsetHeight
                      const targetScroll =
                        sectionTop +
                        (index / spielmodiData.length) *
                          (sectionHeight - window.innerHeight)
                      window.scrollTo({ top: targetScroll, behavior: "smooth" })
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-10"
                      : index < activeIndex
                        ? "w-4"
                        : "w-4"
                  }`}
                  style={{
                    backgroundColor:
                      index === activeIndex
                        ? item.color
                        : index < activeIndex
                          ? `${item.color}80`
                          : "var(--border)",
                  }}
                  aria-label={`Gehe zu ${item.title}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3D Canvas - Right side (hidden on mobile) */}
        <div className="absolute inset-0 hidden md:relative md:block md:w-1/2">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              <Scene activeIndex={activeIndex} scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  )
}

// Preload the GLB model
useGLTF.preload("/Mac.glb")
