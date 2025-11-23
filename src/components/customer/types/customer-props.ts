export interface CustomerImage {
  alternativeText?: string
  url: string
}

export interface CustomerProps {
  title: string
  description: string
  subTitle: string
  linkText: string
  link: string
  blank?: boolean
  image?: CustomerImage | null
}

