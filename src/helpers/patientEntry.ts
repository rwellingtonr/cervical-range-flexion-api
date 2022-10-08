import type { Movement } from "../entities/patientData"

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

    const initialSet = ({ patientId, movement, crefito }: IPatientEntryHistory): void => {
        Object.assign(patientData, { patientId, crefito, movement })
    }

    const setScore = (value: number): void => {
        const { score } = patientData
        if (score.length) {
            const dif = value - score[0]
            score.push(dif)
            return
        }
        score.push(value)
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
