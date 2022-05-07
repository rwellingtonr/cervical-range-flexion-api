import { Application } from "express"
import { PhysiotherapistController } from "./physiotherapistController"

const controller = new PhysiotherapistController()

export const physiotherapistRoutes = (app: Application) => {
	app.get("/physiotherapist", controller.findAll)

	app.route("/physiotherapist/:professionalId")
		.get(controller.findOne)
		.patch(controller.updatePassword)
		.delete(controller.deleteProfessional)
}

export const physiotherapistNormalRoutes = (app: Application) => {
	app.post("/physiotherapist", controller.createProfessional)
}
