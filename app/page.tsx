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
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Zum Inhalt springen
      </a>
      <main>
        <Navbar />
        {/* The skip link needs to land after Navbar, not on <main> itself
            (which wraps Navbar too) - otherwise "skipping" the nav lands
            you right back at its own top instead of past it. */}
        <div id="main-content">
          <HeroSection latestNews={latestNews} />
          <SpielmodeSection />
          <TeamSection />
          <NewsSection />
          <SiteFooter />
        </div>
      </main>
    </>
  )
}
