import "dotenv/config"
import log from "../../utils/loggers"
import { SerialPort, ReadlineParser } from "serialport"
import { io } from "../../app"
import { errorCb } from "../../utils/errorCb"
import { calcMax } from "../../utils/math"
import { patientData } from "./socket"
import PatientHistoryService from "../patientHistory/patientHistoryServices"
import PatientDataRepo from "../../repositories/patient/patientDataRepo"

type EmitterStrings = "start" | "abort"

const serialPort = new SerialPort({
    path: process.env.ARDUINO_PORT,
    baudRate: 9600,
    autoOpen: false,
})

const parser = serialPort.pipe(new ReadlineParser({ encoding: "utf-8" }))

export const emitSerial = (payload: EmitterStrings) => {
    return serialPort.write(payload, errorCb)
}

const handleEvent = async (event: string) => {
    if (/Received/.test(event)) return log.debug(event)

    // log.debug(`Comes from arduino: ${event}`)
    switch (event.trim()) {
        case "tare": {
            io.emit("tare")
            break
        }
        case "end":
            await handleEndProcess()
            break
        default:
            handleReceivedValue(event)
            break
    }
}
const handleEndProcess = async () => {
    log.info("Coleta finalizada!")
    const { coffito, patientId, score } = patientData
    const max = calcMax(score)
    const history = new PatientHistoryService(new PatientDataRepo())
    await history.appendPatientMeasurements(patientId, max, coffito)
}

const handleReceivedValue = (event: string) => {
    const [, value] = event.split("Value: ")
    log.debug(value)
    const num = Number(value)
    io.emit("measure", { num })
    patientData.score.push(num)
}

export const startSerial = () => serialPort.open(errorCb)

parser.on("data", handleEvent)
serialPort.on("open", () => log.info("Serial port is running!"))
serialPort.on("error", (err) => log.error(`Serial port error: ${err}`))
serialPort.on("close", () => log.warn("Closing Serial Port"))
