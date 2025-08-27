// Export all tRPC routers and utilities
export * from './src/root'
export * from './src/trpc'

// Export specific routers
export { collegesRouter } from './src/routers/colleges'
export { coursesRouter } from './src/routers/courses'
export { specializationsRouter } from './src/routers/specializations'
export { leadsRouter } from './src/routers/leads'