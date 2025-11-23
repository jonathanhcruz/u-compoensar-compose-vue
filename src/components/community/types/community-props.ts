export interface CommunityCard {
  id: number | string
  title: string
  description: string
  to?: string
  ariaLabel?: string
  icon?: string
}

export interface CommunityProps {
  title: string
  subTitle: string
  card: CommunityCard[]
}

