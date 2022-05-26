import { Application } from "express"
import { PatientHistoryController } from "./patientHistoryController"

const controller = new PatientHistoryController()

const patientHistoryRoutes = (app: Application) => {
    app.route("/history/:patientId").get(controller.getHistory)
    app.post("/append", controller.addMeasurement)
}

export { patientHistoryRoutes }
