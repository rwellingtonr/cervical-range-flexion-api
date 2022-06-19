import log from "../utils/loggers"
import { SerialPort, ReadlineParser } from "serialport"

const port = new SerialPort({
    path: process.env.ARDUINO_PORT,
    baudRate: 9600,
    autoOpen: false,
})

const parser = port.pipe(new ReadlineParser({ encoding: "utf-8" }))

parser.pipe(port)
parser.on("data", (data: string) => log.info(data))

port.on("open", () => log.debug("open"))

port.on("readable", () => log.debug(port.read().toString()))
