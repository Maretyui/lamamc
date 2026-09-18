import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LamaMC.net - Dein Minecraft Netzwerk",
    short_name: "LamaMC",
    description:
      "LamaMC.net ist ein deutsches Minecraft-Netzwerk mit Survival, GoldPVP, Duels und Realms.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1f3a",
    theme_color: "#1a1f3a",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "1080x1080",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
