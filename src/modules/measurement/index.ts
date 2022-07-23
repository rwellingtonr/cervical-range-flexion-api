import { io } from "../../app"
import { Socket } from "socket.io"
import PatientHistoryService from "../patientHistory/patientHistoryServices"
import log from "../../utils/loggers"
import PatientDataRepo from "../../repositories/patient/patientDataRepo"

interface IPatientData {
    patientId: string
    coffito: string
    score?: number[]
}

const patientData: IPatientData = {
    patientId: "",
    coffito: "",
    score: [0],
}

//
io.on("connection", (socket: Socket) => {
    log.debug(`Socket id ${socket.id}`)
    socket.on("start", ({ patientId, coffito }: IPatientData) => {
        // [] enviar sinal ao uC para iniciar a coleta
        patientData["patientId"] = patientId
        patientData["coffito"] = coffito

        log.debug("start-measurement")
    })

    socket.on("tare", () => {
        /*
        [] envia o sinal ao micro controlador para resetar os parâmetros
        dos sensores
        */
        log.debug("Tare")
        setTimeout(() => socket.emit("tare"), 1000)
    })

    socket.on("stop", async () => {
        //[]  para o envio de dados do uC

        const { coffito, patientId, score } = patientData
        log.debug("end")

        const max = maxValue(score)

        const history = new PatientHistoryService(new PatientDataRepo())
        await history.appendPatientMeasurements(patientId, max, coffito)
    })
    socket.on("abort", () => {
        //[]  para o envio de dados do uC
        patientData["score"] = [0]
    })

    socket.on("disconnect", (reason) => log.debug(reason))
})

const maxValue = (arr: number[]): number => Math.max(...arr)
