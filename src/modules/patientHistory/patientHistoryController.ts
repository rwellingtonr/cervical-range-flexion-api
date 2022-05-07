import { Request, Response } from "express"
import { logErr } from "../../utils/loggers"
import { PatientHistoryService } from "./patientHistoryServices"

export class PatientHistoryController {
	async getHistory(req: Request, res: Response) {
		try {
			const { patientId } = req.params

			const firstDate = req.query["firstDate"] as string
			const lastDate = req.query["lastDate"] as string

			const service = new PatientHistoryService()
			const histories = await service.getPatientHistory(patientId, firstDate, lastDate)

			return res.status(200).json(histories)
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}
}
