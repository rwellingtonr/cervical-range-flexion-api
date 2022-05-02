import { Request, Response } from "express"
import { PatientDataRepo } from "../../repositories/patient/patientDataRepo"
import { logErr } from "../../utils/loggers"
import { PatientHistoryService } from "./patientHistoryServices"

export class PatientHistoryController {
	private repository: PatientDataRepo
	private service: PatientHistoryService

	constructor() {
		this.repository = new PatientDataRepo()
		this.service = new PatientHistoryService(this.repository)
	}

	async getHistory(req: Request, res: Response) {
		try {
			const { patientId } = req.params

			const firstDate = req.query["firstDate"] as string
			const lastDate = req.query["lastDate"] as string

			const histories = await this.service.getPatientHistory(patientId, firstDate, lastDate)

			return res.status(200).json(histories)
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}
}
