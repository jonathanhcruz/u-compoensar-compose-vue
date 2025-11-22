import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)
app.use(store)
app.use(router)

if (typeof window !== 'undefined') {
  let resizeTimeout: any = null
  const handleResize = () => {
    if (!store || typeof store.dispatch !== 'function') return
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      try {
        store.dispatch && store.dispatch('device/updateType')
      } catch (e) {
        console.error('Error dispatching device/updateType on resize', e)
      }
    }, 200)
  }

  try {
    store.dispatch && store.dispatch('device/updateType')
  } catch (e) {}

  window.addEventListener('resize', handleResize)
  window.addEventListener('beforeunload', () => window.removeEventListener('resize', handleResize))
}

// Global error handler (client) to report to dev server for inspection
if (typeof window !== 'undefined') {
  window.addEventListener('error', (ev) => {
    try {
      fetch('/__client_error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: ev.message, filename: ev.filename, lineno: ev.lineno, colno: ev.colno, stack: ev.error?.stack })
      })
    } catch (e) {
      // ignore
    }
    console.error(ev.error || ev.message)
  })
  window.addEventListener('unhandledrejection', (ev) => {
    try {
      fetch('/__client_error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: ev.reason?.message || String(ev.reason), stack: ev.reason?.stack })
      })
    } catch (e) {}
    console.error(ev.reason)
  })
}

app.mount('#app')
