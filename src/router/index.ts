import { Application } from "express"
import { physiotherapistRoutes } from "../modules/physiotherapist/physiotherapistRoutes"
import { app } from "../app"

const activeRoutes = (application: Application): void => {
	physiotherapistRoutes(application)
}

activeRoutes(app)
