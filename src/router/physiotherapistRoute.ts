import { Router } from "express"
import { ensureAuthenticated } from "../middleware/auth"
import { physioController } from "../modules/physiotherapist/physiotherapistModule"

const router = Router()
const physiotherapistRouter = Router()
const noAuthRoute = Router()

router.get("/", (req, res) => physioController.findAll(req, res))

router
    .route("/:professionalId")
    .get((req, res) => physioController.findOne(req, res))
    .delete((req, res) => physioController.deleteProfessional(req, res))

noAuthRoute.post("/", (req, res) => physioController.createProfessional(req, res))
noAuthRoute.patch("/:professionalId", (req, res) => physioController.updatePassword(req, res))

physiotherapistRouter.use("/physiotherapist", noAuthRoute)
physiotherapistRouter.use("/physiotherapist", ensureAuthenticated, router)

export default physiotherapistRouter
