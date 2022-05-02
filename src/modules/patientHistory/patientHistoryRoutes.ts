import { Application } from "express"
import { PatientHistoryController } from "./patientHistoryController"

const patientHistoryRoutes = (app: Application) => {
	app.route("/history/:patientId").get(new PatientHistoryController().getHistory)
}

export { patientHistoryRoutes }
