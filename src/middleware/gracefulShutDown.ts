import { io, serverHttp } from "@app/index"
import { prisma } from "@database/index"
import { errorCb } from "@utils/errorCb"
import arduinoSerialPort from "@modules/integration/serialPort"
import log from "@utils/loggers"

const gracefulShutDown = (event: string) => {
    return serverHttp.close(() => {
        log.warn(`Ending ${process.pid} with event ${event}`)
        io.close()
        arduinoSerialPort.disconnect().catch(errorCb)
        prisma.$disconnect().catch(errorCb)
        log.warn("All process has been closed!")
        process.exit(0)
    })
}

process.on("SIGINT", gracefulShutDown)
process.on("SIGTERM", gracefulShutDown)
