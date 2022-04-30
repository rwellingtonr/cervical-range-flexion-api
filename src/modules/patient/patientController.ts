import { Request, Response } from "express"
import { Patient } from "../../entities/patient"
import { PatientRepo } from "../../repositories/patient/patientRepo"

import { logErr } from "../../utils/loggers"
import { PatientServices } from "./patientServices"

export class PatientController {
	private patientRepo: PatientRepo
	private patientServices: PatientServices

	constructor() {
		this.patientRepo = new PatientRepo()
		this.patientServices = new PatientServices(this.patientRepo)
	}

	async register(req: Request, res: Response) {
		try {
			const patient: Patient = req.body

			return res.status(201).json()
		} catch (error) {
			logErr(error.message)
			return res.status(400).json({ error: error.message })
		}
	}

	async searchAll(req: Request, res: Response) {
		try {
			return res.status(200).json()
		} catch (error) {
			logErr(error.message)
			return res.status(400).json({ error: error.message })
		}
	}

	async searchOne(req: Request, res: Response) {
		try {
			return res.status(200).json()
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}
	async unregister(req: Request, res: Response) {
		try {
			return res.status(200).json()
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}
}
