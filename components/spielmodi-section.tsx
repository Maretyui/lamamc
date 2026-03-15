"use client"

import { Suspense, useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
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

function ScreenMesh({ texturePath }: { texturePath: string }) {
  const texture = useTexture(texturePath)
  if (texture) {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
  }
  return (
    <mesh position={[0, 0.001, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        toneMapped={false}
      />
    </mesh>
  )
}

function MacBook({ index, activeIndex, texturePath }: { index: number; activeIndex: number; texturePath: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  
  // Modell und Textur laden
  const { scene } = useGLTF("/Mac.glb") as any
  const texture = useTexture(texturePath)
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.magFilter = THREE.LinearFilter
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.anisotropy = 16
      texture.needsUpdate = true
    }

    clone.traverse((child: any) => {
      if (child.isMesh) {
        const meshName = child.name?.toLowerCase() || ""
        const matName = child.material?.name?.toLowerCase() || ""
        
        const isScreen = 
          meshName.includes("screen") || 
          meshName.includes("lcd") || 
          meshName.includes("display") ||
          meshName.includes("cube010_4") ||
          matName.includes("lcd") ||
          matName.includes("screen") ||
          matName.includes("display") ||
          matName.includes("emissive") ||
          child.name === "Cube010_4"
        
        const isGlass = 
          meshName.includes("glass") || 
          meshName.includes("cube010_5") ||
          matName.includes("glass") ||
          child.name === "Cube010_5"

        if (isScreen && texture) {
          // Compute the bounding box to find screen UV scale/offset
          child.geometry.computeBoundingBox()
          const screenTex = texture.clone()
          screenTex.needsUpdate = true
          screenTex.colorSpace = THREE.SRGBColorSpace
          screenTex.magFilter = THREE.LinearFilter
          screenTex.minFilter = THREE.LinearMipmapLinearFilter
          screenTex.anisotropy = 16
          // Keep flipY matching the mesh's UV convention
          screenTex.flipY = child.geometry.attributes.uv ? true : false
          child.material = new THREE.MeshBasicMaterial({ 
            map: screenTex,
            side: THREE.FrontSide,
            transparent: false,
            toneMapped: false
          })
          child.material.needsUpdate = true
        }
        
        if (isGlass) {
          child.visible = false 
        }
      }
    })
    return clone
  }, [scene, texture])

  // Animationen (bleiben wie von dir gewünscht)
  useFrame((state, delta) => {
    if (!groupRef.current) return
    timeRef.current += delta

    let targetY = 0
    let targetZ = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let targetScale = 5.5

    if (index === activeIndex) {
      targetY = -0.15
      targetRotationX = -0.05
      targetRotationY = Math.sin(timeRef.current * 0.5) * 0.03
    } else if (index < activeIndex) {
      const offset = activeIndex - index
      targetY = 4 + offset * 1.5
      targetZ = -4 - offset * 1.0
      targetRotationX = -0.9
      targetScale = 4
    } else {
      const offset = index - activeIndex
      targetY = -5 - offset * 1.5
      targetZ = -4 - offset * 1.0
      targetRotationX = 0.25
      targetScale = 4.8
    }

    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 4)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 4)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, delta * 4)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 4)
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 4)
    groupRef.current.scale.setScalar(s)
  })

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
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
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div className="z-10 w-full px-6 md:w-1/2 md:px-12 lg:px-20">
          <div className="max-w-xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
              Spielmodi
            </p>

            <div className="relative min-h-320px">
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

        <div className="hidden md:block md:w-1/2 h-screen flex-shrink-0 overflow-hidden">
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 35 }}
            gl={{ antialias: true, alpha: true, dpr: [1, 2] }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            <Suspense fallback={null}>
              <Scene activeIndex={activeIndex} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  )
}

useGLTF.preload("/Mac.glb")
