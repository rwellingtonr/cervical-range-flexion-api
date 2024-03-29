import { io } from "@app/index"
import logger from "@utils/loggers"
import patientEntry from "./patientEntry"

export function handleEventData(event: string) {
    event = event.trim()
    if (/Received/.test(event)) return logger.debug(event)

    if (event === "tare") {
        logger.info("Device is ready to be used")
        return io.emit("tare")
    }

    handleReceivedValue(event)
}

function handleReceivedValue(event: string) {
    const [, value] = event.split("Value: ")
    const realScore = Math.abs(+value)

    const relativeScore = patientEntry.setScore(realScore)
    io.emit("measurement", { score: relativeScore })
}
