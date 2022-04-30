import { Application } from "express"
import { physiotherapistRoutes } from "../modules/physiotherapist/physiotherapistRoutes"
import { signInRoutes } from "../modules/login/signInRoutes"

const activeRoutes = (app: Application) => {
	physiotherapistRoutes(app)
	signInRoutes(app)
}
export { activeRoutes }
