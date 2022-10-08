import { Request, Response } from "express"
import PatientDataRepo from "../../repositories/patient/patientDataRepo"
import PatientHistoryController from "./patientHistoryController"
import PatientHistoryService from "./patientHistoryServices"

const patientHistoryFactory = () => {
    const service = new PatientHistoryService(new PatientDataRepo())
    const controller = new PatientHistoryController(service)

    const createEntry = () => async (req: Request, res: Response) => {
        return await controller.addMeasurement(req, res)
    }
    const getHistory = () => async (req: Request, res: Response) => {
        return await controller.getHistory(req, res)
    }
    return {
        createEntry,
        getHistory,
    }
}

export default patientHistoryFactory()
