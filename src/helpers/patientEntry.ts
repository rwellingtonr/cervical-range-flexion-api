import type { Movement } from "@entities/patientData"
import logger from "@utils/loggers"

export interface IPatientEntryHistory {
    patientId: string
    crefito: string
    movement: Movement
    score?: number[]
}

function patientEntry() {
    const patientData: IPatientEntryHistory = {
        patientId: "",
        crefito: "",
        movement: "flexion",
        score: [],
    }

    const initialSet = ({ patientId, movement, crefito, score }: IPatientEntryHistory) => {
        Object.assign(patientData, { patientId, crefito, movement, score })
    }

    const setScore = (value: number) => {
        if (!patientData?.score) return
        const { score } = patientData
        if (score.length) {
            const dif = value - score[0]
            logger.info(`Score: ${score[0]}, Received: ${value}, Dif: ${dif}`)
            score.push(dif)
            return dif
        }
        score.push(value)
        return 0
    }

    const cleanUp = () => {
        for (const key in patientData) {
            delete patientData[key]
        }
    }

    const getResult = () => {
        /* Comparar com um padrão pre definido de normalidade
         */
        const maxScore = Math.max(...patientData.score)
        return { ...patientData, maxScore }
    }

    return {
        cleanUp,
        initialSet,
        setScore,
        getResult,
    }
}
export default patientEntry()
