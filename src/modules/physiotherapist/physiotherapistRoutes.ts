import { Application } from "express"
import { PhysiotherapistController } from "./physiotherapistController"

const physiotherapistRoutes = (app: Application) => {
	const controller = new PhysiotherapistController()
	app.route("/physiotherapist/info").post(controller.createProfessional).get(controller.findAll)

	app.route("/physiotherapist/:professionalId")
		.get(controller.findOne)
		.patch(controller.updatePassword)
		.delete(controller.deleteProfessional)
}

export { physiotherapistRoutes }
