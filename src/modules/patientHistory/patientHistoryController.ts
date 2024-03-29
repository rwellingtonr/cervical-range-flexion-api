import { Request, Response } from "express"
import log from "@utils/loggers"
import { ICreateEntryDTO } from "./patientHistoryDTO"
import PatientHistoryService from "./patientHistoryServices"
import type { Movement } from "@entities/patientData"

export default class PatientHistoryController {
    constructor(private readonly service: PatientHistoryService) {}
    async getHistory(req: Request, res: Response) {
        try {
            const { patientId } = req.params

            const firstDate = req.query["firstDate"] as string
            const lastDate = req.query["lastDate"] as string
            const movement = req.query["movement"] as Movement

            const histories = await this.service.getPatientHistory({
                patientId,
                firstDate,
                lastDate,
                movement,
            })

            return res.status(200).json(histories)
        } catch (error) {
            log.error(error.message)
            return res.status(404).json({ error: error.message })
        }
    }

    async addMeasurement(req: Request, res: Response) {
        try {
            const { patientId, maxScore, movement, crefito }: ICreateEntryDTO = req.body
            await this.service.appendPatientMeasurements({ patientId, maxScore, movement, crefito })
            return res.sendStatus(201)
        } catch (error) {
            log.error(error.message)
            return res.status(404).json({ error: error.message })
        }
    }
}
