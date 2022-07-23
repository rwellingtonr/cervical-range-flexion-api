import { Router } from "express"
import { ensureAuthenticated } from "../middleware/auth"
import { physioController } from "../modules/physiotherapist/physiotherapistModule"

const router = Router()
const physiotherapistRouter = Router()

router.get("/", (req, res) => physioController.findAll(req, res))

router
    .route("/:professionalId")
    .get((req, res) => physioController.findOne(req, res))
    .patch((req, res) => physioController.updatePassword(req, res))
    .delete((req, res) => physioController.deleteProfessional(req, res))

physiotherapistRouter.use("/physiotherapist/", ensureAuthenticated, router)

export default physiotherapistRouter
