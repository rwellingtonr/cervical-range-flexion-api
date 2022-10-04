import "dotenv/config"
import log from "../../utils/loggers"
import { SerialPort, ReadlineParser } from "serialport"
import { io } from "../../app"
import { patientData } from "./socket"

type EmitterStrings = "flexion" | "lateral" | "abort"

const arduinoSerialPort = () => {
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
        serialPort.on("close", () => log.warn("Closing Serial Port"))
    }
    function emitter(payload: EmitterStrings) {
        return new Promise((resolve, reject) => {
            serialPort.write(payload, "utf-8", (err: Error) => {
                if (err) return reject(err)
                resolve(payload)
            })
        })
    }

    return {
        connect,
        emitter,
    }
}
const arduino = arduinoSerialPort()

arduino.connect().catch((err) => log.error(err))

async function handleEventData(event: string) {
    log.debug(`handleEventData: ${event}`)
    if (/Received/.test(event)) return log.debug(event)

    switch (event.trim()) {
        case "tare": {
            log.info("Chegou aqui!!")
            io.emit("tare")
            await arduino.emitter("lateral")
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

function handleReceivedValue(event: string) {
    const [, value] = event.split("Value: ")
    const score = Number(value)
    log.debug(`Score: ${score}`)
    io.emit("measurement", { score })
    //patientData.score.push(score)
}
