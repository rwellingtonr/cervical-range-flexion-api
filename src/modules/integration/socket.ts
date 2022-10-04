import log from "../../utils/loggers"
import PatientDataRepo from "../../repositories/patient/patientDataRepo"
import PatientHistoryService from "../patientHistory/patientHistoryServices"
import { Socket } from "socket.io"
import { connectSerial, emitSerial, isSerialPortOpen, startSerial } from "./serialPort"
import { io } from "../../app"
import { calcMax } from "../../utils/math"
import type { Movement } from "../../entities/patientData"
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

io.on("connection", (socket: Socket) => {
    log.debug(`Socket id ${socket.id}`)

    socket.on("start", ({ patientId, crefito, movement }: ISocketDTO) => {
        log.debug("start-measurement")
        Object.assign(patientData, { patientId, crefito, movement, score: [0] })
        emitSerial("start")
    })

    socket.on("tare", () => {
        log.debug("Tare")
        const isOpen = isSerialPortOpen()
        log.debug("aqui", isSerialPortOpen())
        if (!isOpen) {
            return socket.emit("message", {
                status: "error",
                msg: "Reconecte o arduino",
            })
        }
    })

    socket.on("abort", () => {
        log.debug("Aborting process")
        emitSerial("abort")
    })

    socket.on("save", async () => {
        try {
            const { crefito, patientId, score } = patientData
            const max = calcMax(score)
            const history = new PatientHistoryService(new PatientDataRepo())
            await history.appendPatientMeasurements(patientId, max, crefito)
            cleanUpPatientData()
        } catch (err) {
            socket.emit("message", { status: "error", msg: "Erro ao salvar os dados!" })
            log.error(`Error to save data: ${err}`)
        }
    })

    socket.on("reconnect-arduino", async () => {
        await connectSerial()
        const isOpen = await startSerial()
        log.debug("Socket: reconnect-arduino:", isOpen)
        if (!isOpen) {
            socket.emit("message", {
                status: "error",
                msg: "Erro ao conectar ao arduino",
            })
            return
        }
        socket.emit("message", { status: "info", msg: "Arduino está conectado" })
    })

    socket.on("disconnect", (reason) => log.warn("Socket: ", reason))
})
