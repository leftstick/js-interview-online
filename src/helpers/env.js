export const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev'
export const isProduction = process.env.NODE_ENV === 'production'
