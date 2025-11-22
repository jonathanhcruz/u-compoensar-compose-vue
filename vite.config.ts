import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [vue()],
  server: {
    middlewareMode: false,
  },
  ...((globalThis as any).process?.env?.NODE_ENV !== 'production' ? {
    plugins: [vue(), {
      name: 'vite-plugin-client-error-reporter',
      configureServer(server: any) {
        server.middlewares.use(async (req: any, res: any, next: any) => {
          if (req.method === 'POST' && req.url === '/__client_error') {
            try {
              let body = ''
              if (Symbol.asyncIterator in req) {
                for await (const chunk of req) body += chunk
              } else {
                // collect data via event listeners
                body = await new Promise((resolve) => {
                  const parts: string[] = []
                  req.setEncoding && req.setEncoding('utf8')
                  req.on('data', (c: any) => parts.push(String(c)))
                  req.on('end', () => resolve(parts.join('')))
                })
              }
              try {
                const json = JSON.parse(body)
                server.config.logger.info('[client error] ' + (json.message || JSON.stringify(json)))
                server.config.logger.info('[client stack] ' + (json.stack || ''))
              } catch (e) {
                server.config.logger.info('[client error] ' + body)
              }
            } catch (e) {
              server.config.logger.error('[client error] failed to read body: ' + e)
            }
            res.statusCode = 204
            res.end()
            return
          }
          next()
        })
      }
    }]
  } : {})
}))
