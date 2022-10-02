import "dotenv/config"
import log from "../../utils/loggers"
import { SerialPort, ReadlineParser } from "serialport"
import { io } from "../../app"
import { errorCb } from "../../utils/errorCb"
import { patientData } from "./socket"

type EmitterStrings = "start" | "abort"

const config = {
    path: process.env.ARDUINO_PORT,
    baudRate: 9600,
    autoOpen: false,
}

let serialPort = new SerialPort(config)

connectSerial().catch((err) => log.error(err))

export async function connectSerial() {
    log.info("Connecting to arduino")
    const ports = await SerialPort.list()
    const arduino = ports.find((port) => port.manufacturer)
    if (arduino) {
        log.debug("Arduino:", arduino)
        serialPort = new SerialPort({
            ...config,
            path: arduino.path,
        })
        await startSerial()
    }
}

const parser = serialPort.pipe(new ReadlineParser({ encoding: "utf-8" }))

function startSerialPort() {
    return new Promise((resolve, reject) => {
        serialPort.open((err) => {
            if (err) return reject(err)
            return resolve("OK")
        })
    })
}

export const startSerial = async () => {
    try {
        await startSerialPort()
        log.info(`Is serial port open? ${serialPort.isOpen}`)
        return serialPort.isOpen
    } catch (err) {
        log.error(err)
        return false
    }
}
export const isSerialPortOpen = () => serialPort.isOpen

export const emitSerial = (payload: EmitterStrings) => {
    return serialPort.write(payload, errorCb)
}

const handleEvent = (event: string) => {
    log.debug(event)
    if (/Received/.test(event)) return log.debug(event)

    switch (event.trim()) {
        case "tare": {
            io.emit("tare")
            break
        }
        case "end":
            log.info("Coleta finalizada!")
            io.emit("end")
            break
        default:
            handleReceivedValue(event)
            break
    }
}

const handleReceivedValue = (event: string) => {
    const [, value] = event.split("Value: ")
    log.debug(value)
    const score = Number(value)
    io.emit("measurement", { score })
    patientData.score.push(score)
}

parser.on("data", handleEvent)
serialPort.on("open", () => log.info("Serial port is running!"))
serialPort.on("error", (err) => log.error(`Serial port error: ${err}`))
serialPort.on("close", () => log.warn("Closing Serial Port"))
