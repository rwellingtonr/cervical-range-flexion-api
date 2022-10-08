import log from "../../utils/loggers"
import { Socket } from "socket.io"
import { io } from "../../app"
import { arduinoSerialPort } from "./serialPort"
import patientEntry, { IPatientEntryHistory } from "../../helpers/patientEntry"

const arduino = arduinoSerialPort()

io.on("connection", (socket: Socket) => {
    log.info(`Socket id: ${socket.id}`)

    socket.on("connect-arduino", async () => {
        try {
            log.debug("Socket: Connecting")
            await arduino.connect()
            socket.emit("status", { status: "loaded" })
        } catch (err) {
            log.error("Socket:", err)
            socketMessage("Erro ao conectar", "error")
        }
    })

    socket.on("start", async ({ patientId, crefito, movement }: IPatientEntryHistory) => {
        try {
            log.debug("Socket: start-measurement")
            patientEntry.initialSet({ patientId, crefito, movement, score: [0] })
            await arduino.emitter(movement)
        } catch (err) {
            log.error("Socket:", err)
            socketMessage("Erro ao iniciar as medições!", "error")
        }
    })

    socket.on("status", () => {
        const isOnline = arduino.isConnected()
        const status = isOnline ? "loaded" : "disconnected"
        socket.emit("status", { status })
    })

    socket.on("end-process", async () => {
        try {
            log.debug("Socket: Ending Process")
            const measurementResult = patientEntry.getResult()
            socket.emit("result", measurementResult)
            await arduino.emitter("end")
            patientEntry.cleanUp()
        } catch (err) {
            log.error("Socket:", err)
            socketMessage("Erro ao abortar as medições!", "error")
        }
    })

    socket.on("abort", async () => {
        try {
            log.debug("Socket: Aborting process")
            patientEntry.cleanUp()
            await arduino.emitter("abort")
        } catch (err) {
            log.error("Socket:", err)
            socketMessage("Erro ao abortar as medições!", "error")
        }
    })

    socket.on("disconnect", (reason) => log.warn(`Socket: ${reason}`))

    function socketMessage(msg: string, status: string) {
        socket.emit("message", { status, msg })
    }
})
