import { Router } from "express"
import factory from "@modules/login/signInModule"

const router = Router()

router.post("/signin", factory.login())

export default router
