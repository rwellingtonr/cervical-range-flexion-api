import log from "../../utils/loggers"
import { Socket } from "socket.io"

import { io } from "../../app"
import { calcMax } from "../../utils/math"
import type { Movement } from "../../entities/patientData"
import { arduinoSerialPort } from "./serialPort"
interface ISocketDTO {
    patientId: string
    crefito: string
    movement: Movement
}
interface IPatientData extends ISocketDTO {
    score: number[]
}
export const patientData: IPatientData = {
    patientId: "",
    crefito: "",
    movement: "flexion",
    score: [],
}
const cleanUpPatientData = () => {
    for (const key in patientData) {
        delete patientData[key]
    }
}

const arduino = arduinoSerialPort()

io.on("connection", (socket: Socket) => {
    log.debug(`Socket id ${socket.id}`)
    socket.on("start", ({ patientId, crefito, movement }: ISocketDTO) => {
        log.debug("start-measurement")
        Object.assign(patientData, { patientId, crefito, movement, score: [0] })
        emitSerial("start")
    })

    socket.on("status", () => {
        const isOnline = arduino.isConnected()
        const status = isOnline ? "loaded" : "disconnected"
        socket.emit("status", { status })
    })

    socket.on("tare", async () => {
        try {
            log.debug("Socket Tare")
            if (!arduino.isConnected()) {
                await arduino.connect()
            }
            socket.emit("message", {
                type: "info",
                msg: "Arduino is online",
            })
        } catch (err) {
            log.error(err)
        }
    })

    socket.on("abort", () => {
        log.debug("Aborting process")
        emitSerial("abort")
    })

    socket.on("end", async () => {
        log.info("Clean Up")
        cleanUpPatientData()
    })

    socket.on("reconnect-arduino", async () => {
        if (!arduino.isConnected()) {
            await arduino.connect()
        }
        socket.emit("status", { status: "loaded" })
    })

    socket.on("disconnect", (reason) => log.warn("Socket: ", reason))

    function socketMessage(msg: string, status: string) {
        socket.emit("message", { status, msg })
    }
})
