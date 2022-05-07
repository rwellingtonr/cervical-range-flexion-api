import { Request, Response } from "express"
import { PhysiotherapistService } from "./physiotherapistService"
import { logErr, logInfo } from "../../utils/loggers"
import { Physiotherapist } from "../../entities/physiotherapist"

export class PhysiotherapistController {
	constructor() {}

	async createProfessional(req: Request, res: Response) {
		try {
			const professionalInfo: Physiotherapist = req.body

			const service = new PhysiotherapistService()
			const physiotherapist = await service.register(professionalInfo)

			return res.status(201).json(physiotherapist)
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}
	async findAll(_req: Request, res: Response) {
		try {
			const service = new PhysiotherapistService()
			const physiotherapists = await service.findAllPhysiotherapists()
			return res.status(200).send(physiotherapists)
		} catch (err) {
			logErr(err.message)
			return res.status(400).json({ error: err.message })
		}
	}
	async findOne(req: Request, res: Response) {
		try {
			const { professionalId } = req.params
			const service = new PhysiotherapistService()
			const found = await service.findProfessional(professionalId)

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
			const service = new PhysiotherapistService()
			const updated = await service.updatePassword(professionalId, newPassword)

			return res.status(200).json(updated)
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}

	async deleteProfessional(req: Request, res: Response) {
		try {
			const { professionalId } = req.params
			const service = new PhysiotherapistService()
			await service.unregister(professionalId)

			return res.status(200).json({ message: `ID ${professionalId} has been deleted` })
		} catch (error) {
			logErr(error.message)
			return res.status(404).json({ error: error.message })
		}
	}
}
