"use client"

import { Suspense, useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, useTexture } from "@react-three/drei"
import * as THREE from "three"
import Image from "next/image"

// Suppress THREE.Clock deprecation warning (R3F internal usage)
const originalWarn = console.warn
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return
  originalWarn.apply(console, args)
}

const SERVER_IP = "LamaMC.net"

const spielmodiData = [
  {
    id: 1,
    title: "Survival",
    subtitle: "Klassisches Abenteuer.",
    description:
      "Erlebe klassisches Survival mit Custom Items, Clans und einer lebendigen Welt. Baue, kämpfe und überlebe mit Freunden.",
    image: "/images/servers/survival.png",
    color: "#4ade80",
    version: "1.21.10",
  },
  {
    id: 2,
    title: "GoldPVP",
    subtitle: "Kämpfe um Gold.",
    description:
      "Kämpfe in einem intensiven PvP-Modus um Gold-Coins zum Gear-Upgrade. Zeige deine Skills und werde der beste Kämpfer.",
    image: "/images/servers/goldpvp.png",
    color: "#fbbf24",
    version: "1.8.9",
  },
  {
    id: 3,
    title: "Duels",
    subtitle: "1v1 Herausforderung.",
    description:
      "Fordere Freunde zu spannenden 1v1-Duellen heraus und verbessere deine PvP-Skills in fairen Kämpfen.",
    image: "/images/servers/duels.png",
    color: "#f87171",
    version: "1.21.11",
  },
  {
    id: 4,
    title: "Realms",
    subtitle: "Deine eigene Welt.",
    description:
      "Baue und teile deine eigene Welt mit Freunden. Gestalte alles nach deinen Wünschen in unserem Realms-Modus.",
    image: "/images/servers/realms.png",
    color: "#60a5fa",
    version: "1.21.10",
  },
  {
    id: 5,
    title: "Lobby",
    subtitle: "Treffpunkt der Community.",
    description:
      "Treffe andere Spieler, chatte und bereite dich auf deine Abenteuer vor. Der zentrale Hub für alle LamaMC-Spieler.",
    image: "/images/servers/lobby.png",
    color: "#a78bfa",
    version: "1.21.10",
  },
  {
    id: 6,
    title: "???",
    subtitle: "Geheimes Projekt.",
    description:
      "Hierfür hast du nicht die nötigen Berechtigungen. Etwas Großes ist in Arbeit – stay tuned.",
    image: "/images/servers/image.png",
    color: "#94a3b8",
    version: "1.21.x",
  },
]

interface MacBookProps {
  index: number
  activeIndex: number
  texturePath: string
}

function MacBook({ index, activeIndex, texturePath }: MacBookProps) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  const { scene, nodes } = useGLTF("/Mac.glb") as unknown as {
    scene: THREE.Group
    nodes: Record<string, THREE.Object3D>
  }

  // Create a unique clone for each MacBook
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => m.clone())
        } else {
          mesh.material = mesh.material.clone()
        }
      }
    })
    return clone
  }, [scene])

  const isActive = index === activeIndex
  const isPast = index < activeIndex
  const isFuture = index > activeIndex

  useFrame((_, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta

    let targetY = 0
    let targetZ = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let targetScale = 1

    if (isActive) {
      targetY = 0
      targetZ = 0
      targetRotationX = -0.08
      targetRotationY = Math.sin(timeRef.current * 0.4) * 0.04
      targetScale = 1
    } else if (isPast) {
      const offset = activeIndex - index
      targetY = 2.5 + offset * 0.6
      targetZ = -2.5 - offset * 0.6
      targetRotationX = -0.9
      targetScale = Math.max(0.5, 0.85 - offset * 0.12)
    } else {
      const offset = index - activeIndex
      targetY = -1.8 - offset * 0.35
      targetZ = -0.6 - offset * 0.6
      targetRotationX = 0.25
      targetScale = Math.max(0.55, 0.9 - offset * 0.08)
    }

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 4
    )
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      delta * 4
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      delta * 4
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      delta * 4
    )
    const newScale = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      delta * 4
    )
    groupRef.current.scale.setScalar(newScale)
  })

  // Find the screen mesh in the GLB to project the texture on it
  const screenMesh = useMemo(() => {
    let found: THREE.Mesh | null = null
    const meshes: string[] = []
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        meshes.push(child.name)
        const name = child.name.toLowerCase()
        // Common screen mesh names in MacBook GLB models
        if (
          name.includes("screen") ||
          name.includes("display") ||
          name.includes("monitor") ||
          name.includes("lcd") ||
          name.includes("glass") ||
          name.includes("bildschirm") ||
          name.includes("panel") ||
          name === "object_3" ||
          name === "object_4" ||
          name.includes("emissive")
        ) {
          found = child as THREE.Mesh
        }
      }
    })
    // Debug: log all mesh names to find the right one
    if (index === 0) {
      console.log("[v0] MacBook GLB mesh names:", meshes)
    }
    return found
  }, [clonedScene, index])

  const texture = useTexture(texturePath)

  useEffect(() => {
    if (screenMesh) {
      console.log("[v0] Found screen mesh:", screenMesh.name)
      texture.flipY = false
      texture.colorSpace = THREE.SRGBColorSpace
      texture.needsUpdate = true
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        toneMapped: false
      })
        ; (screenMesh as THREE.Mesh).material = mat
    } else if (index === 0) {
      console.log("[v0] No screen mesh found, applying to first large mesh")
      // Fallback: find the largest flat mesh (likely the screen)
      let largestMesh: THREE.Mesh | null = null
      let maxArea = 0
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          const geo = mesh.geometry
          if (geo.boundingBox) {
            geo.computeBoundingBox()
          }
          if (geo.boundingBox) {
            const size = new THREE.Vector3()
            geo.boundingBox.getSize(size)
            const area = size.x * size.y
            if (area > maxArea) {
              maxArea = area
              largestMesh = mesh
            }
          }
        }
      })
      if (largestMesh) {
        console.log("[v0] Using largest mesh as screen:", (largestMesh as THREE.Mesh).name)
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace
        texture.needsUpdate = true
        const mat = new THREE.MeshBasicMaterial({
          map: texture,
          toneMapped: false
        })
          ; (largestMesh as THREE.Mesh).material = mat
      }
    }
  }, [screenMesh, texture, clonedScene, index])

  return (
    <group
      ref={groupRef}
      position={[0, -0.8 - index * 0.2, -0.3 - index * 0.3]}
    >
      <primitive object={clonedScene} scale={5.5} />
    </group>
  )
}

function Scene({
  activeIndex,
}: {
  activeIndex: number
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, -3]} intensity={0.4} />
      <pointLight position={[0, 3, 3]} intensity={0.5} />
      <Environment preset="city" />

      {spielmodiData.map((item, index) => (
        <MacBook
          key={item.id}
          index={index}
          activeIndex={activeIndex}
          texturePath={item.image}
        />
      ))}
    </>
  )
}

export function SpielmodeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const sectionHeight = containerRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const scrolled = -rect.top
      const totalScrollable = sectionHeight - windowHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))
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

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return
    const sectionTop = containerRef.current.offsetTop
    const sectionHeight = containerRef.current.offsetHeight
    const windowHeight = window.innerHeight
    const targetScroll =
      sectionTop + (index / spielmodiData.length) * (sectionHeight - windowHeight)
    window.scrollTo({ top: targetScroll, behavior: "smooth" })
  }

  const currentItem = spielmodiData[activeIndex]

  return (
    <section
      id="spielmodi"
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${spielmodiData.length * 100 + 50}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Left: Text content */}
        <div className="z-10 w-full px-6 md:w-1/2 md:px-12 lg:px-20">
          <div className="max-w-xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
              Spielmodi
            </p>

            <div className="relative min-h-[320px]">
              {spielmodiData.map((item, index) => (
                <div
                  key={item.id}
                  className={`transition-all duration-700 ease-out ${index === activeIndex
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
                  <h3 className="mb-5 text-4xl font-extrabold text-foreground md:text-5xl lg:text-6xl">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    Version: <span className="font-bold text-foreground">{item.version}</span>
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile screenshot */}
            <div className="mt-8 overflow-hidden rounded-xl border border-border/50 md:hidden">
              <div className="relative aspect-video">
                {spielmodiData.map((item, index) => (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${index === activeIndex ? "opacity-100" : "opacity-0"
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
                  onClick={() => scrollToIndex(index)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: index === activeIndex ? "2.5rem" : "1rem",
                    backgroundColor:
                      index === activeIndex
                        ? item.color
                        : index < activeIndex
                          ? `${item.color}60`
                          : "var(--border)",
                  }}
                  aria-label={`Gehe zu ${item.title}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: 3D Canvas */}
        <div className="absolute inset-0 hidden md:relative md:flex md:w-1/2 md:items-center md:justify-center" style={{ minHeight: '100vh' }}>
          <div className="h-full w-full" style={{ height: '120vh', marginTop: '0' }}>
            <Canvas
              camera={{ position: [0, 0.5, 2.2], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent", height: '100%' }}
            >
              <Suspense fallback={null}>
                <Scene activeIndex={activeIndex} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  )
}

useGLTF.preload("/Mac.glb")
