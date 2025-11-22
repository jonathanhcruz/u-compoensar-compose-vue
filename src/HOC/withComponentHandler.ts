import { defineComponent, h, ref, onErrorCaptured } from 'vue'
import type { Component, ComponentPublicInstance } from 'vue'

export type withComponentHandlerOptions = {
  fallback?: Component | ((props: { error: Error; reset: () => void }) => any)
  onError?: (err: unknown, instance: ComponentPublicInstance | null, info?: string) => void
}

export function withComponentHandler(Wrapped: Component, options: withComponentHandlerOptions = {}) {
  const wrappedName = (Wrapped as any)?.name || 'AnonymousComponent'

  return defineComponent({
    name: `withComponentHandler(${wrappedName})`,
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      const error = ref<Error | null>(null)

      onErrorCaptured((err: unknown, instance, info) => {
        // normalize error into Error and set
        error.value = err instanceof Error ? err : new Error(String(err))
        try {
          options.onError?.(err, instance, info)
        } catch (e) {
          // swallow errors from the error handler to avoid loops
          // eslint-disable-next-line no-console
          console.error('Error in onError handler', e)
        }
        // returning false prevents the error from propagating further
        return false
      })

      const reset = () => {
        error.value = null
      }

      return () => {
        if (error.value) {
          // render fallback if provided
          if (options.fallback) {
            if (typeof options.fallback === 'function') {
              return (options.fallback as any)({ error: error.value, reset })
            }
            return h(options.fallback as any, { error: error.value, reset })
          }

          // default fallback UI
          return h(
            'div',
            {
              style:
                'padding:16px;border-radius:6px;background:#fff7f7;color:#7b1f1f;border:1px solid #ffd6d6',
            },
            [
              h('strong', 'Ha ocurrido un error'),
              h('pre', { style: 'white-space:pre-wrap;margin-top:8px' }, error.value.message),
              h(
                'button',
                { onClick: reset, style: 'margin-top:10px;padding:6px 10px' },
                'Reintentar'
              ),
            ]
          )
        }

        // render wrapped component forwarding attrs and slots
        return h(Wrapped as any, { ...attrs }, slots)
      }
    },
  })
}
