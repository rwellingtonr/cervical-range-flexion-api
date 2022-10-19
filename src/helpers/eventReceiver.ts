import { io } from "@app/index"
import logger from "@utils/loggers"
import patientEntry from "./patientEntry"

export function handleEventData(event: string) {
    if (/Received/.test(event)) return logger.debug(event)
    logger.debug(event)

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
