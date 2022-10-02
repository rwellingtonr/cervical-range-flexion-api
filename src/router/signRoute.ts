import { Router } from "express"
import { adapterRoute } from "../adapter/controller"
import { signController } from "../modules/login/signInModule"

const router = Router()

router.post("/signin", adapterRoute(signController()))

export default router
