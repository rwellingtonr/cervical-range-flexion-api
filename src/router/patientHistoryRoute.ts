import { Router } from "express"
import { ensureAuthenticated } from "@middleware/auth"
import patientHistoryFactory from "@modules/patientHistory/patientModule"
const router = Router()
const patientHistoryRouter = Router()

router.post("/", patientHistoryFactory.createEntry())
router.get("/:patientId", patientHistoryFactory.getHistory())

patientHistoryRouter.use("/history", ensureAuthenticated, router)

export default patientHistoryRouter
