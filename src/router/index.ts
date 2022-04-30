import { Application } from "express"
import { signInRoutes } from "../modules/login/signInRoutes"
import { physiotherapistRoutes } from "../modules/physiotherapist/physiotherapistRoutes"
import { patientRoutes } from "../modules/patient/patientRoutes"
import { patientHistoryRoutes } from "../modules/patientHistory/patientHistoryRoutes"

const activeRoutes = (app: Application) => {
	signInRoutes(app)
	physiotherapistRoutes(app)
	patientRoutes(app)
	patientHistoryRoutes(app)
}
export { activeRoutes }
