import PatientDataRepo from "../../repositories/patient/patientDataRepo"
import PatientHistoryController from "./patientHistoryController"
import PatientHistoryService from "./patientHistoryServices"

const service = new PatientHistoryService(new PatientDataRepo())
const controller = new PatientHistoryController(service)

export { controller }
