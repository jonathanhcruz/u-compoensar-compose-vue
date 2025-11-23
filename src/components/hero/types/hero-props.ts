export interface HeroImage {
  alternativeText?: string
  caption?: string
  url?: string
}

export interface HeroProps {
  title?: string
  subTitle?: string
  description?: string
  image?: HeroImage | null
}

