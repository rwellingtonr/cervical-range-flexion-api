import { Request, Response } from "express"
import PatientRepo from "../../repositories/patient/patientRepo"
import PatientController from "./patientController"
import PatientServices from "./patientServices"

function patientFactory() {
    const service = new PatientServices(new PatientRepo())
    const controller = new PatientController(service)

    const create = () => async (req: Request, res: Response) => await controller.register(req, res)

    const findAll = () => async (req: Request, res: Response) => {
        return await controller.searchAll(req, res)
    }

    const findOne = () => async (req: Request, res: Response) => {
        return await controller.searchOne(req, res)
    }

    const remove = () => async (req: Request, res: Response) => controller.unregister(req, res)

    return {
        create,
        findAll,
        findOne,
        remove,
    }
}
export default patientFactory()
