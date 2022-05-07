import { SerialPort, ReadlineParser } from "serialport"

const serialPort = new SerialPort({
	path: process.env.ARDUINO_PORT,
	baudRate: 9600,
})
const parser = new ReadlineParser({ delimiter: "\r\n" })

serialPort.pipe(parser)

export { serialPort, parser }
