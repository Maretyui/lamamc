import type { NewsItem, TeamMember } from "./types"

const defaultNews: NewsItem[] = [
  {
    id: "1",
    title: "Survival Season II",
    content:
      "Die zweite Season auf unserem Survival Server startet am 7. März! Neue Welten, aber alte Items?",
    date: "2026-03-07",
    author: "Paul",
  },
  {
    id: "2",
    title: "Neuer BedWars Modus",
    content:
      "Ab sofort gibt es einen neuen 4v4v4v4 Modus auf unserem BedWars Server. Stellt euch der Herausforderung mit euren Freunden!",
    date: "2026-02-15",
    author: "Paul",
  },
  {
    id: "3",
    title: "SkyBlock Season 3 Start",
    content:
      "Die dritte Season auf SkyBlock startet am Wochenende. Neue Inseln, neue Challenges und exklusive Belohnungen warten auf euch.",
    date: "2026-02-10",
    author: "Paul",
  },
  {
    id: "4",
    title: "CityBuild Erweiterung",
    content:
      "Die CityBuild Welt wurde um neue Gebiete erweitert. Sichert euch jetzt die besten Grundstuecke in der neuen Zone!",
    date: "2026-02-05",
    author: "Paul",
  },
  {
    id: "5",
    title: "Valentinstag-Event",
    content:
      "Feiert den Valentinstag mit besonderen Quests und Belohnungen auf allen Servern. Das Event laeuft bis Ende Februar!",
    date: "2026-02-01",
    author: "Paul",
  },
]

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "Paul",
    role: "Owner",
    image: "https://mc-heads.net/avatar/KarlDasLamaZockt/128",
    link: "https://twitter.com",
  },
  {
    id: "2",
    name: "Mare",
    role: "Public Relations",
    image: "https://mc-heads.net/avatar/Maretyui/128",
    link: "https://maretyui.com",
  },
  {
    id: "3",
    name: "Felix",
    role: "Moderator",
    image: "https://mc-heads.net/avatar/Somepainter4727/128",
    link: "https://twitter.com",
  },
  {
    id: "4",
    name: "Erdinand",
    role: "Moderator",
    image: "https://mc-heads.net/avatar/Torbentoaster/128",
    link: "https://twitter.com",
  },
  {
    id: "5",
    name: "Quadrizeps",
    role: "Developer",
    image: "https://mc-heads.net/avatar/quadrixyt/128",
    link: "https://github.com",
  },
]

let newsStore: NewsItem[] = [...defaultNews]
let teamStore: TeamMember[] = [...defaultTeam]

export function getNews(): NewsItem[] {
  return newsStore
}

export function setNews(news: NewsItem[]): void {
  newsStore = news
}

export function addNews(item: NewsItem): void {
  newsStore.unshift(item)
}

export function updateNews(id: string, updated: Partial<NewsItem>): boolean {
  const index = newsStore.findIndex((n) => n.id === id)
  if (index === -1) return false
  newsStore[index] = { ...newsStore[index], ...updated }
  return true
}

export function deleteNews(id: string): boolean {
  const before = newsStore.length
  newsStore = newsStore.filter((n) => n.id !== id)
  return newsStore.length < before
}

export function getTeam(): TeamMember[] {
  return teamStore
}

export function setTeam(team: TeamMember[]): void {
  teamStore = team
}

export function addTeamMember(member: TeamMember): void {
  teamStore.push(member)
}

export function updateTeamMember(
  id: string,
  updated: Partial<TeamMember>
): boolean {
  const index = teamStore.findIndex((t) => t.id === id)
  if (index === -1) return false
  teamStore[index] = { ...teamStore[index], ...updated }
  return true
}

export function deleteTeamMember(id: string): boolean {
  const before = teamStore.length
  teamStore = teamStore.filter((t) => t.id !== id)
  return teamStore.length < before
}
