import { PhysiotherapistRepo } from "../../repositories/physiotherapistRepo/physiotherapistRepo"
import PhysiotherapistController from "./physiotherapistController"
import PhysiotherapistService from "./physiotherapistService"

const service = new PhysiotherapistService(new PhysiotherapistRepo())
const physioController = new PhysiotherapistController(service)

export { physioController }
