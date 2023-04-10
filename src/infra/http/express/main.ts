import { initDB } from '@/infra/db';
import { env } from '@/utils/env';
import { app } from './server';
import { debug } from 'console';

const PORT = env.PORT
const MODE = env.NODE_ENV

initDB();

const server = app.listen(PORT, () => {
  console.log(`Server running in ${MODE?.toUpperCase()} MODE on PORT ${PORT}!`)
})

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})