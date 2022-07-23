import { Router } from "express"
import { signController } from "../modules/login/signInModule"

const router = Router()

router.post("/signin", (req, res) => signController.handle(req, res))

export default router
