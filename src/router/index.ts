import { Application } from "express"
import { signInRoutes } from "../modules/login/signInRoutes"
import { physiotherapistRoutes } from "../modules/physiotherapist/physiotherapistRoutes"
import { patientRoutes } from "../modules/patient/patientRoutes"
import { patientHistoryRoutes } from "../modules/patientHistory/patientHistoryRoutes"
import { logInfo } from "../utils/loggers"

export const activeRoutes = (app: Application) => {
	logInfo("Activating routes")
	signInRoutes(app)
	physiotherapistRoutes(app)
	patientRoutes(app)
	patientHistoryRoutes(app)
}
