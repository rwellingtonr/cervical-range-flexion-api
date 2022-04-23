import { Request, Response } from "express"
import { PhysiotherapistService } from "./physiotherapistService"
import { logErr } from "../../utils/loggers"
import { Physiotherapist } from "../../entities/physiotherapist"
import { PhysiotherapistRepo } from "../../repositories/physiotherapistRepo/physiotherapistRepo"

export class PhysiotherapistController {
	private service: PhysiotherapistService
	private repository: PhysiotherapistRepo

	constructor() {
		this.repository = new PhysiotherapistRepo()
		this.service = new PhysiotherapistService(this.repository)
	}

	async createProfessional(req: Request, res: Response) {
		try {
			const professionalInfo: Physiotherapist = req.body

			const physiotherapist = await this.service.register(professionalInfo)

			return res.status(201).json(physiotherapist)
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}
	async findOne(req: Request, res: Response) {
		try {
			const { professionalId } = req.params

			const found = await this.service.findProfessional(professionalId)

			return res.status(200).json(found)
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}

	async updatePassword(req: Request, res: Response) {
		try {
			const { professionalId } = req.params
			const { newPassword } = req.body

			const updated = await this.service.updatePassword(professionalId, newPassword)

			return res.status(200).json(updated)
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}

	async deleteProfessional(req: Request, res: Response) {
		try {
			const { professionalId } = req.params

			await this.service.unregister(professionalId)

			return res.status(200).json({ message: `ID ${professionalId} has been deleted` })
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}
}
