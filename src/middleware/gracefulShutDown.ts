import { io, serverHttp } from "../app"
import { prisma } from "../database"
import log from "../utils/loggers"

const gracefulShutDown = (event: string) => {
    return serverHttp.close(() => {
        log.warn(`Ending ${process.pid} with event ${event}`)
        io.close()
        prisma.$disconnect().catch((e) => log.error(e))
        process.exit(0)
    })
}

process.on("SIGINT", gracefulShutDown)
process.on("SIGTERM", gracefulShutDown)
