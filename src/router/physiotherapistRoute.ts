import { Router } from "express"
import { ensureAuthenticated } from "@middleware/auth"
import physiotherapistFactory from "@modules/physiotherapist/physiotherapistModule"

const router = Router()
const physiotherapistRouter = Router()
const noAuthRoute = Router()

router.get("/", physiotherapistFactory.find())

router
    .route("/:professionalId")
    .get(physiotherapistFactory.findOne())
    .delete(physiotherapistFactory.remove())

noAuthRoute.post("/", physiotherapistFactory.create())
noAuthRoute.patch("/:crefitoId", physiotherapistFactory.update())

physiotherapistRouter.use("/physiotherapist", noAuthRoute)
physiotherapistRouter.use("/physiotherapist", ensureAuthenticated, router)

export default physiotherapistRouter
