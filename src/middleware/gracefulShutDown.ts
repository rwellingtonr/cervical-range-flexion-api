import { io, serverHttp } from "../app"
import { serialPort } from "../config/serialPort"
import { prisma } from "../database"
import log from "../utils/loggers"

const gracefulShutDown = (event: string) => {
    return serverHttp.close(() => {
        log.warn(`Ending ${process.pid} with event ${event}`)
        serialPort.close()
        io.close()
        prisma.$disconnect().catch((e) => log.error(e))
        log.warn("All process has been closed!")
        process.exit(0)
    })
}

process.on("SIGINT", gracefulShutDown)
process.on("SIGTERM", gracefulShutDown)
