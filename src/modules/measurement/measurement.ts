import { serialPort, parser } from "../../config/serialPort"
import log from "../../utils/loggers"
import { io } from "../../app"
import { Socket } from "socket.io"

interface IPatientData {
	name: string
	score: number[]
}

const patientData: IPatientData = { name: "", score: [] }

serialPort.on("data", (data) => log.debug("Serial data: ", data))
serialPort.on("readable", () => log.debug("Readable Port: ", serialPort.read()))
// serialPort.write("Port Write")

parser.on("data", (data) => log.debug("Parser data: ", data))
parser.on("readable", () => log.debug("Parser readable: ", parser.read()))

//
io.on("connection", (socket: Socket) => {
	socket.on("start-measurement", ({ patientName }) => {
		patientData.name = patientName

		log.debug("start-measurement")
	})

	socket.on("end-measurement", () => {})
})
