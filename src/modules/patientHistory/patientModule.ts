import PatientDataRepo from "../../repositories/patient/patientDataRepo"
import PatientHistoryController from "./patientHistoryController"
import PatientHistoryService from "./patientHistoryServices"

const repository = new PatientDataRepo()
const service = new PatientHistoryService(repository)
const controller = new PatientHistoryController(service)

export { controller }
