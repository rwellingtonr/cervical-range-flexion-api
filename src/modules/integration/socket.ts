import log from "../../utils/loggers"
import { Socket } from "socket.io"
import { io } from "../../app"
import { arduinoSerialPort } from "./serialPort"
import { IPatientData, ISocketDTO } from "./integrationInterfaces"

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
    log.info(`Socket id: ${socket.id}`)

    socket.on("connect-arduino", async () => {
        try {
            if (!arduino.isConnected()) await arduino.connect()
            socket.emit("status", { status: "loaded" })
        } catch (err) {
            log.error(err)
            socketMessage("Erro ao conectar", "error")
        }
    })

    socket.on("start", async ({ patientId, crefito, movement }: ISocketDTO) => {
        try {
            log.debug("start-measurement")
            Object.assign(patientData, { patientId, crefito, movement, score: [0] })
            await arduino.emitter(movement)
        } catch (err) {
            log.error(err)
            socketMessage("Erro ao iniciar as medições!", "error")
        }
    })

    socket.on("status", () => {
        const isOnline = arduino.isConnected()
        const status = isOnline ? "loaded" : "disconnected"
        socket.emit("status", { status })
    })

    socket.on("abort", async () => {
        try {
            log.debug("Aborting process")
            await arduino.emitter("abort")
        } catch (err) {
            log.error(err)
            socketMessage("Erro ao abortar as medições!", "error")
        }
    })

    socket.on("end", () => {
        log.info("Clean Up")
        cleanUpPatientData()
    })

    socket.on("disconnect", (reason) => log.warn(`Socket: ${reason}`))

    function socketMessage(msg: string, status: string) {
        socket.emit("message", { status, msg })
    }
})
