import { serialPort, parser } from "../../config/serialPort"
import { logInfo } from "../../utils/loggers"
import { io } from "../../app"
import { Socket } from "socket.io"

interface IPatientData {
	name: string
	score: number[]
}

const patientData: IPatientData = { name: "", score: [] }

serialPort.on("data", (data) => logInfo("Serial data: ", data))
serialPort.on("readable", () => logInfo("Readable Port: ", serialPort.read()))
// serialPort.write("Port Write")

parser.on("data", (data) => logInfo("Parser data: ", data))
parser.on("readable", () => logInfo("Parser readable: ", parser.read()))

//
io.on("connection", (socket: Socket) => {
	socket.on("start-measurement", ({ patientName }) => {
		patientData.name = patientName

		logInfo("start-measurement")
	})

	socket.on("end-measurement", () => {})
})
