import type { EmitterStrings } from "./integrationInterfaces"
import log from "@utils/loggers"
import { SerialPort, ReadlineParser } from "serialport"
import { io } from "@app/index"
import { handleEventData } from "@helpers/eventReceiver"

const arduinoSerialPort = (() => {
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
            log.debug(`Enviado o evento: ${payload}`)
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

    function disconnect() {
        if (!isConnected()) return

        log.info("Closing serial port...")
        return new Promise<string>((resolve, reject) => {
            serialPort.close((err) => {
                if (err) return reject(err)
                return resolve("done")
            })
        })
    }

    return {
        connect,
        emitter,
        isConnected,
        disconnect,
    }
})()

export default arduinoSerialPort
