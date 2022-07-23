import { Router } from "express"
import * as Routes from "./routes"

const router = Router()

for (const key in Routes) {
    router.use(Routes[key])
}

export { router }
