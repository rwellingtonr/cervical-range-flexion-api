import { Router } from "express"
import fs from "fs/promises"
import logger from "../utils/loggers"

const router = Router()

initializeRoutes().catch((e) => logger.error(e))
async function initializeRoutes() {
    const routes = (await fs.readdir(__dirname)).filter((file) => !file.includes("index"))
    for (const route of routes) {
        const r = await import(`./${route}`)
        router.use(r.default)
    }
}
export { router }
