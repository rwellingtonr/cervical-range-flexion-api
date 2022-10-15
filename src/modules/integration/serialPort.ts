import log from "@utils/loggers"
import { SerialPort, ReadlineParser } from "serialport"
import { io } from "@app/index"
import type { EmitterStrings } from "./integrationInterfaces"
import patientEntry from "@helpers/patientEntry"

export const arduinoSerialPort = () => {
    let serialPort: SerialPort
    let parser: ReadlineParser

    async function connect() {
        log.info("Connecting to arduino")
        const ports = await SerialPort.list()
        const arduino = ports.find((port) => port.manufacturer)
        if (arduino) {
            log.debug("Arduino:", arduino)
            serialPort = new SerialPort({
                path: arduino.path,
                baudRate: 9600,
                autoOpen: true,
            })
            setParser()
            return handleEvents()
        }
        throw new Error("Arduino is not connected!")
    }
    function setParser() {
        log.info("Staring parser!")
        parser = serialPort.pipe(new ReadlineParser({ encoding: "utf-8" }))
        parser.on("data", handleEventData)
    }

    function handleEvents() {
        serialPort.on("open", () => log.info("Serial port is running!"))
        serialPort.on("error", (err) => log.error(`Serial port error: ${err}`))
        serialPort.on("close", () => {
            io.emit("status", { status: "disconnected" })
            log.warn("Closing Serial Port")
        })
    }
    function emitter(payload: EmitterStrings) {
        return new Promise((resolve, reject) => {
            log.debug(`Passou aqui o evento: ${payload}`)
            serialPort.write(payload, "utf-8", (err: Error) => {
                if (err) return reject(err)
                resolve(payload)
            })
        })
    }
    function isConnected() {
        try {
            return serialPort.isOpen
        } catch (err) {
            log.error(err.message)
            return false
        }
    }

    return {
        connect,
        emitter,
        isConnected,
    }
}

function handleEventData(event: string) {
    if (/Received/.test(event)) return log.debug(event)
    log.debug(event)

    event = event.trim()
    if (event === "tare") return io.emit("tare")

    handleReceivedValue(event)
}

function handleReceivedValue(event: string) {
    const [, value] = event.split("Value: ")
    const score = Math.abs(+value)

    io.emit("measurement", { score })
    patientEntry.setScore(score)
}
