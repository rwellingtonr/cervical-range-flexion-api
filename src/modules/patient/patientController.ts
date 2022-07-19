import { Request, Response } from "express"
import { Patient } from "../../entities/patient"
import log from "../../utils/loggers"
import { PatientServices } from "./patientServices"

export class PatientController {
    async register(req: Request, res: Response) {
        try {
            const patient: Patient = req.body
            const patientService = new PatientServices()
            const user = await patientService.create(patient)

            return res.status(201).json(user)
        } catch (error) {
            log.error(error.message)
            return res.status(400).json({ error: error.message })
        }
    }

    async searchAll(req: Request, res: Response) {
        try {
            const patientServices = new PatientServices()
            const patients = await patientServices.searchAll()

            return res.status(200).json(patients)
        } catch (error) {
            log.error(error.message)
            return res.status(400).json({ error: error.message })
        }
    }

    async searchOne(req: Request, res: Response) {
        try {
            const { patientId } = req.params
            const patientServices = new PatientServices()
            const patient = await patientServices.findOne(patientId)

            return res.status(200).json(patient)
        } catch (error) {
            log.error(error.message)
            return res.status(404).json({ error: error.message })
        }
    }
    async unregister(req: Request, res: Response) {
        try {
            const { patientId } = req.params
            const patientServices = new PatientServices()
            await patientServices.unregister(patientId)

            return res.sendStatus(200)
        } catch (error) {
            log.error(error.message)
            return res.status(404).json({ error: error.message })
        }
    }
}
