import PhysiotherapistRepo from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import SingInController from "./signInController"
import SignService from "./signInService"

const signController = () => {
    const service = new SignService(new PhysiotherapistRepo())
    return new SingInController(service)
}

export { signController }
