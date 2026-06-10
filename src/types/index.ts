export interface NewsArticle {
  id: string
  title: string
  category: 'latest' | 'club' | 'first-team'
  date: string
  image: string
  excerpt: string
  readTime: number
  featured?: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'jersey' | 'training' | 'accessories' | 'kids'
  badge?: string
  inStock: boolean
  colors?: string[]
}

export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  date: string
  time: string
  competition: string
  stadium: string
  status: 'live' | 'upcoming' | 'finished'
  minute?: number
  streamUrl?: string
  thumbnail: string
}

export interface MembershipPlan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  highlighted?: boolean
}
