import log from "@utils/loggers"
import { Socket } from "socket.io"
import { io } from "@app/index"
import arduinoSerialPort from "./serialPort"
import patientEntry, { IPatientEntryHistory } from "@helpers/patientEntry"

io.on("connection", (socket: Socket) => {
    log.info(`Socket id: ${socket.id}`)

    socket.on("connect-arduinoSerialPort", async () => {
        try {
            log.debug("Socket: Connecting")
            await arduinoSerialPort.connect()
            socket.emit("status", { status: "loaded" })
        } catch (err) {
            log.error("Socket:", err)
            socketMessage("Erro ao conectar", "error")
        }
    })

    socket.on("start", async ({ patientId, crefito, movement }: IPatientEntryHistory) => {
        try {
            log.debug("Socket: start-measurement")
            patientEntry.initialSet({ patientId, crefito, movement, score: [] })
            await arduinoSerialPort.emitter(movement)
        } catch (err) {
            log.error("Socket:", err)
            socketMessage("Erro ao iniciar as medições!", "error")
        }
    })

    socket.on("status", () => {
        const isOnline = arduinoSerialPort.isConnected()
        const status = isOnline ? "loaded" : "disconnected"
        socket.emit("status", { status })
    })

    socket.on("end-process", async () => {
        try {
            log.debug("Socket: Ending Process")
            const measurementResult = patientEntry.getResult()
            await arduinoSerialPort.emitter("end")
            setTimeout(() => {
                socket.emit("result", measurementResult)
            }, 500)
            patientEntry.cleanUp()
        } catch (err) {
            log.error("Socket:", err)
            socketMessage("Erro ao abortar as medições!", "error")
        }
    })

    socket.on("disconnect-arduinoSerialPort", async () => {
        try {
            await arduinoSerialPort.disconnect()
        } catch (err) {
            log.error(err)
        }
    })

    socket.on("abort", async () => {
        try {
            log.debug("Socket: Aborting process")
            patientEntry.cleanUp()
            await arduinoSerialPort.emitter("abort")
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
