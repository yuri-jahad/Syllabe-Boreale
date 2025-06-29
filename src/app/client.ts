import { treaty } from '@elysiajs/eden'
import type { App } from '@backend/core/app/app.routes'
export const api = treaty<App>('http://localhost:5000', {
  fetch: {
    credentials: 'include'
  }
})
