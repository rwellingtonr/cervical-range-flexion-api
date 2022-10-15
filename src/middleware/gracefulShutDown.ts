import { io, serverHttp } from "@app/index"
import { prisma } from "@database/index"
import log from "@utils/loggers"

const gracefulShutDown = (event: string) => {
    return serverHttp.close(() => {
        log.warn(`Ending ${process.pid} with event ${event}`)
        io.close()
        prisma.$disconnect().catch((e) => log.error(e))
        log.warn("All process has been closed!")
        process.exit(0)
    })
}

process.on("SIGINT", gracefulShutDown)
process.on("SIGTERM", gracefulShutDown)
