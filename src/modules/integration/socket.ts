import { Socket } from "socket.io"
import { connectSerial, emitSerial, startSerial } from "./serialPort"
import { io } from "../../app"
import log from "../../utils/loggers"
import { calcMax } from "../../utils/math"
import PatientHistoryService from "../patientHistory/patientHistoryServices"
import PatientDataRepo from "../../repositories/patient/patientDataRepo"
interface ISocketDTO {
    patientId: string
    crefito: string
}
interface IPatientData {
    patientId: string
    crefito: string
    score: number[]
}
export const patientData: IPatientData = {
    patientId: "",
    crefito: "",
    score: [],
}
const cleanUpPatientData = () => {
    for (const key in patientData) {
        delete patientData[key]
    }
}

io.on("connection", (socket: Socket) => {
    log.debug(`Socket id ${socket.id}`)

    socket.on("start", ({ patientId, crefito }: ISocketDTO) => {
        log.debug("start-measurement")
        Object.assign(patientData, { patientId, crefito, score: [0] })
        emitSerial("start")
    })

    socket.on("tare", () => {
        log.debug("Tare")
        const isOpen = startSerial()
        if (!isOpen) socket.emit("error", { msg: "Erro ao conectar ao arduino" })
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
            socket.emit("error", { msg: "Erro ao salvar os dados!" })
            log.error(`Error to save data: ${err}`)
        }
    })

    socket.on("reconect-arduino", async () => {
        await connectSerial()
        const isOpen = startSerial()
        if (!isOpen) socket.emit("error", { msg: "Erro ao conectar ao arduino" })
    })

    socket.on("disconnect", (reason) => log.warn(reason))
})
