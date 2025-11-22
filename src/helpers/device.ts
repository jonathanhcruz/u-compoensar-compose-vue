export type DeviceType = 'mobile' | 'tablet' | 'web'

export function getDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'web'

  const width = window.innerWidth || document.documentElement.clientWidth || 0

  // Primary check by width
  if (width <= 767) return 'mobile'
  if (width <= 1024) return 'tablet'
  return 'web'
}
