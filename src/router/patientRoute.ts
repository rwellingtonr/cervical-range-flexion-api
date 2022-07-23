import { Router } from "express"
import { ensureAuthenticated } from "../middleware/auth"
import { patientController } from "../modules/patient/patientModule"

const router = Router()
const patientRouter = Router()
router
    .route("/")
    .post((req, res) => patientController.register(req, res))
    .get((req, res) => patientController.searchAll(req, res))

router
    .route("/:patientId")
    .get((req, res) => patientController.searchOne(req, res))
    .delete((req, res) => patientController.unregister(req, res))

patientRouter.use("/patient", ensureAuthenticated, router)
export default patientRouter
