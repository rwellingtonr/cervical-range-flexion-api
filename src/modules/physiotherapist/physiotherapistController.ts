import { Request, Response } from "express"
import PhysiotherapistService from "./physiotherapistService"
import log from "@utils/loggers"
import { Physiotherapist } from "@entities/physiotherapist"

export default class PhysiotherapistController {
    constructor(private readonly service: PhysiotherapistService) {}
    async createProfessional(req: Request, res: Response) {
        try {
            const professionalInfo: Physiotherapist = req.body
            await this.service.register(professionalInfo)

            return res.sendStatus(201)
        } catch (error) {
            log.error(error.message)
            return res.status(error.httpCode || 400).json({ error: error.message })
        }
    }
    async findAll(_req: Request, res: Response) {
        try {
            const physiotherapists = await this.service.findAllPhysiotherapists()
            return res.status(200).send(physiotherapists)
        } catch (err) {
            log.error(err.message)
            return res.status(err.httpCode || 400).json({ error: err.message })
        }
    }
    async findOne(req: Request, res: Response) {
        try {
            const { professionalId } = req.params

            const found = await this.service.findProfessional(professionalId)

            return res.status(200).json(found)
        } catch (error) {
            log.error(error.message)
            return res.status(error.httpCode || 400).json({ error: error.message })
        }
    }

    async updatePassword(req: Request, res: Response) {
        try {
            const { crefitoId } = req.params
            const { password } = req.body

            const updated = await this.service.updatePassword(crefitoId, password)

            return res.status(200).json(updated)
        } catch (error) {
            log.error(error.message)
            return res.status(error.httpCode || 400).json({ error: error.message })
        }
    }

    async deleteProfessional(req: Request, res: Response) {
        try {
            const { professionalId } = req.params

            await this.service.unregister(professionalId)

            return res.sendStatus(200)
        } catch (error) {
            log.error(error.message)
            return res.status(error.httpCode || 404).json({ error: error.message })
        }
    }
}
