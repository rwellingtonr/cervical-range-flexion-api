import { Request, Response } from "express"
import PhysiotherapistRepo from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import SingInController from "./signInController"
import SignService from "./signInService"

const signController = () => {
    const service = new SignService(new PhysiotherapistRepo())
    const signIn = new SingInController(service)
    function login() {
        return async (req: Request, res: Response) => await signIn.handle(req, res)
    }
    return { login }
}

export default signController()
