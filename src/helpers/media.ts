import { STRAPI_URL } from '../constants'

export interface MediaImage {
  alternativeText?: string
  caption?: string
  ext?: string
  url?: string
  [key: string]: any
}

/**
 * Resolve a media URL. If url is absolute, return as-is. If relative, prefix with baseUrl.
 * Returns null when there's no url.
 */
export function resolveMediaSrc(image?: MediaImage | null, baseUrl = STRAPI_URL): string | null {
  const url = image?.url
  if (!url) return null
  if (/^https?:\/\//i.test(url)) return url
  return `${baseUrl.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * Resolve alternative text for an image, with optional fallback.
 */
export function resolveMediaAlt(image?: MediaImage | null, fallback = ''): string {
  return image?.alternativeText ?? image?.alt ?? fallback
}

