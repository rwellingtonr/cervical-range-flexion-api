import { Router } from "express"
import { ensureAuthenticated } from "@middleware/auth"
import patientFactory from "@modules/patient/patientModule"

const router = Router()
const patientRouter = Router()

router.route("/").get(patientFactory.findAll()).post(patientFactory.create())

router.route("/:patientId").get(patientFactory.findOne()).delete(patientFactory.remove())

patientRouter.use("/patient", ensureAuthenticated, router)

export default patientRouter
