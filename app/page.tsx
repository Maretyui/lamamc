import { HeroSection } from "@/components/hero-section"
import { SpielmodeSection } from "@/components/spielmodi-section"
import { TeamSection } from "@/components/team-section"
import { NewsSection } from "@/components/news-section"
import { SiteFooter } from "@/components/site-footer"
import { Navbar } from "@/components/navbar"
import { getNews } from "@/lib/data"

export default function HomePage() {
  const news = getNews()
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const latestNews = sortedNews.length > 0 ? sortedNews[0] : null

  return (
    <main>
      <Navbar />
      <HeroSection latestNews={latestNews} />
      <SpielmodeSection />
      <TeamSection />
      <NewsSection />
      <SiteFooter />
    </main>
  )
}
