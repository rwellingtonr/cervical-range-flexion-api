import { Request, Response } from "express"
import PhysiotherapistRepo from "@repositories/physiotherapistRepo/physiotherapistRepo"
import PhysiotherapistController from "./physiotherapistController"
import PhysiotherapistService from "./physiotherapistService"

const physiotherapistFactory = () => {
    const service = new PhysiotherapistService(new PhysiotherapistRepo())
    const physioController = new PhysiotherapistController(service)

    const create = () => async (req: Request, res: Response) => {
        return await physioController.createProfessional(req, res)
    }

    const findOne = () => async (req: Request, res: Response) => {
        return await physioController.findOne(req, res)
    }
    const find = () => async (req: Request, res: Response) => {
        return await physioController.findAll(req, res)
    }
    const update = () => async (req: Request, res: Response) => {
        return await physioController.updatePassword(req, res)
    }
    const remove = () => async (req: Request, res: Response) => {
        return await physioController.deleteProfessional(req, res)
    }

    return {
        create,
        find,
        findOne,
        update,
        remove,
    }
}

export default physiotherapistFactory()
