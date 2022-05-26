import { Application } from "express"
import { PatientController } from "./patientController"

const patientRoutes = (app: Application) => {
    app.route("/patient")
        .post(new PatientController().register)
        .get(new PatientController().searchAll)

    app.route("/patient/:patientId")
        .get(new PatientController().searchOne)
        .delete(new PatientController().unregister)
}

export { patientRoutes }
