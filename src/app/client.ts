import { treaty } from '@elysiajs/eden'
import type { App } from '@backend/core/app/app.routes'


const configs = {
  development: {
    apiUrl: 'http://localhost:5200'
  },
  production: {
    apiUrl: 'https://mwamed.com/api'
  }
} as const;

const environment = (import.meta.env.MODE as keyof typeof configs) || 'development'; 
const config = configs[environment];

export const api = treaty<App>(config.apiUrl, {
  fetch: {
    credentials: 'include'
  }
})