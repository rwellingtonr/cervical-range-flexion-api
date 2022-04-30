import { Application } from "express"

const patientRoutes = (app: Application) => {
	app.route("/patient").post().get()

	app.route("/patient/:patientId").get().patch().delete()
}

export { patientRoutes }
