import { Application } from "express"
import { PatientController } from "./patientController"

const controller = new PatientController()

const patientRoutes = (app: Application) => {
	app.route("/patient").post(controller.register).get(controller.searchAll)

	app.route("/patient/:patientId").get(controller.searchOne).delete(controller.unregister)
}

export { patientRoutes }
