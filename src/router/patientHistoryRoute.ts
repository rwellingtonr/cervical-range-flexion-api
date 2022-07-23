import { Router } from "express"
import { ensureAuthenticated } from "../middleware/auth"
import { controller } from "../modules/patientHistory/patientModule"
const router = Router()
const patientHistoryRouter = Router()

router.post("/", (req, res) => controller.addMeasurement(req, res))
router.get("/:patientId", (req, res) => controller.getHistory(req, res))

patientHistoryRouter.use("/history", ensureAuthenticated, router)

export default patientHistoryRouter
