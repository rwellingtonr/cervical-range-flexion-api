import PhysiotherapistRepo from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import SingInController from "./signInController"
import SignService from "./signInService"

const service = new SignService(new PhysiotherapistRepo())
const signController = new SingInController(service)

export { signController }
