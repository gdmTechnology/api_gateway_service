import 'module-alias/register'
import env from '@/main/config/env'

const startServer = async (): Promise<void> => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
}

void startServer()
