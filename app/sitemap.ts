import type { MetadataRoute } from "next"

const BASE_URL = "https://lamamc.net"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // No lastModified here on purpose - new Date() would falsely signal
      // "changed" to crawlers on every deploy, even ones with zero content
      // changes (lastModified is optional; omitting it is more honest than
      // a value that's wrong as often as it's right).
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/impressum`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
