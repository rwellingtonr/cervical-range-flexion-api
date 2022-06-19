import { serverHttp } from "../app"
import { prisma } from "../database"
import log from "../utils/loggers"

const gracefulShutDown = (event: string) => {
    return () => {
        serverHttp.close(async () => {
            log.info(`Ending ${process.pid} with event ${event}`)
            await prisma.$disconnect()
            process.exit(0)
        })
    }
}

process.on("SIGINT", gracefulShutDown("SIGINT"))
process.on("SIGTERM", gracefulShutDown("SIGTERM"))
