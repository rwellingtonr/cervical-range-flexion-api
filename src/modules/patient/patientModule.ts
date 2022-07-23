import PatientRepo from "../../repositories/patient/patientRepo"
import PatientController from "./patientController"
import PatientServices from "./patientServices"

const service = new PatientServices(new PatientRepo())
const patientController = new PatientController(service)

export { patientController }
