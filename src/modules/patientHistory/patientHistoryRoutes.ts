import { Application } from "express"
import { getHistory } from "./patientHistoryController"

const patientHistoryRoutes = (app: Application) => {
	app.route("/history/:patientId").get(getHistory)
}

export { patientHistoryRoutes }
