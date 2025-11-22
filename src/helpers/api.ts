import { STRAPI_URL, DEFAULT_TIMEOUT } from '../constants'
import type { ApiResponse } from './types/api-types'

function timeoutPromise(ms: number, controller: AbortController) {
  return new Promise((_resolve, reject) => {
    const id = setTimeout(() => {
      controller.abort()
      reject(new Error('Request timed out'))
    }, ms)
    controller.signal.addEventListener('abort', () => clearTimeout(id))
  })
}

async function request<T = any>(
  path: string,
  options: RequestInit = {},
  timeout = DEFAULT_TIMEOUT,
  baseUrl = STRAPI_URL
): Promise<ApiResponse<T>> {
  const controller = new AbortController()
  const signal = controller.signal
  const url = path.startsWith('http') ? path : `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`

  try {
    const fetchPromise = fetch(url, { ...options, signal })
    const res = await Promise.race([fetchPromise, timeoutPromise(timeout, controller)]) as Response

    const contentType = res.headers.get('content-type') || ''
    let body: any
    if (contentType.includes('application/json')) {
      body = await res.json()
    } else {
      body = await res.text()
    }

    if (!res.ok) {
      return {
        ok: false,
        error: {
          message: body?.message || res.statusText || 'Request failed',
          status: res.status,
          details: body,
        },
      }
    }

    return { ok: true, data: body }
  } catch (err: any) {
    // normalized error reporting
    const message = err?.message || 'Unknown error'
    return {
      ok: false,
      error: {
        message,
      },
    }
  }
}

export async function apiGet<T = any>(path: string, options: RequestInit = {}, timeout?: number) {
  return request<T>(path, { method: 'GET', ...options }, timeout)
}

export async function apiPost<T = any>(path: string, body?: any, options: RequestInit = {}, timeout?: number) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  return request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined, ...options, headers }, timeout)
}
