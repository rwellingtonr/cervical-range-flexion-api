import { io, serverHttp } from "@app/index"
import { prisma } from "@database/index"
import arduinoSerialPort from "@modules/integration/serialPort"
import log from "@utils/loggers"

const gracefulShutDown = async (event: string) => {
    try {
        log.warn(`Ending ${process.pid} with event ${event}`)
        await Promise.all([arduinoSerialPort.disconnect(), prisma.$disconnect()])
    } catch (error) {
        log.error(error)
    }

    return serverHttp.close(() => {
        io.close()
        log.warn("All process has been closed!")
        process.exit(0)
    })
}

process.on("SIGINT", gracefulShutDown)
process.on("SIGTERM", gracefulShutDown)
