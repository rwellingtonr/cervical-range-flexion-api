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

    const initialSet = ({ patientId, movement, crefito }: IPatientEntryHistory) => {
        Object.assign(patientData, { patientId, crefito, movement })
    }

    const initialScore = (score: number) => {
        patientData.score.push(score)
    }

    const setScore = (value: number) => {
        patientData.score.push(value)
    }

    const cleanUp = () => {
        for (const key in patientData) {
            delete patientData[key]
        }
    }

    return {
        cleanUp,
        initialSet,
        initialScore,
        setScore,
    }
}
export default patientEntry()
