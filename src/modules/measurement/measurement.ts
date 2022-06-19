import { io } from "../../app"
import { Socket } from "socket.io"
import { PatientHistoryService } from "../patientHistory/patientHistoryServices"
import log from "../../utils/loggers"

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
    })

    socket.on("stop", async () => {
        //[]  para o envio de dados do uC

        const { coffito, patientId, score } = patientData
        log.debug("end")

        const avg = average(score)

        const history = new PatientHistoryService()
        await history.appendPatientMeasurements(patientId, avg, coffito)
    })
    socket.on("abort", () => {
        //[]  para o envio de dados do uC
        patientData["score"] = [0]
    })

    socket.on("close", (reason) => log.debug(reason))
})

const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length
