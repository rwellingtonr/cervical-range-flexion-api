import { Socket } from "socket.io"
import { connectSerial, emitSerial, startSerial } from "./serialPort"
import { io } from "../../app"
import log from "../../utils/loggers"
interface ISocketDTO {
    patientId: string
    coffito: string
}
interface IPatientData {
    patientId: string
    coffito: string
    score: number[]
}
export const patientData: IPatientData = {
    patientId: "",
    coffito: "",
    score: [],
}

io.on("connection", (socket: Socket) => {
    log.debug(`Socket id ${socket.id}`)

    socket.on("start", ({ patientId, coffito }: ISocketDTO) => {
        log.debug("start-measurement")
        Object.assign(patientData, { patientId, coffito, score: [0] })
        emitSerial("start")
    })

    socket.on("tare", () => {
        log.debug("Tare")
        startSerial()
    })

    socket.on("abort", () => {
        log.debug("Aborting process")
        emitSerial("abort")
    })

    socket.on("reconect-arduino", async () => {
        try {
            await connectSerial()
        } catch (err) {
            log.error(`Error to connect to serial port ${err}`)
        }
    })

    socket.on("disconnect", (reason) => log.warn(reason))
})
