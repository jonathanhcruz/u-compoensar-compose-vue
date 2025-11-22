export interface ApiError {
  message: string
  status?: number
  details?: any
}

export interface ApiResponse<T = any> {
  ok: boolean
  data?: T
  error?: ApiError
}

