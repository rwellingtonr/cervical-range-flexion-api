import { PatientRepo } from "../../repositories/patient/patientRepo"
import PatientController from "./patientController"
import PatientServices from "./patientServices"

const repo = new PatientRepo()
const service = new PatientServices(repo)
const patientController = new PatientController(service)

export { patientController }
