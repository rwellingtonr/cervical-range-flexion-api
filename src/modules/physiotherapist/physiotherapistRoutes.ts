import { Application } from "express"
import { PhysiotherapistController } from "./physiotherapistController"

const controller = new PhysiotherapistController()

const physiotherapistRoutes = (app: Application) => {
	app.route("/physiotherapist").post(controller.createProfessional).get(controller.findAll)

	app.route("/physiotherapist/:professionalId")
		.get(controller.findOne)
		.patch(controller.updatePassword)
		.delete(controller.deleteProfessional)
}

export { physiotherapistRoutes }
