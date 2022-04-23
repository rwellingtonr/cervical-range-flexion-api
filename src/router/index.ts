import { app } from "../app"
import { Application } from "express"
import { physiotherapistRoutes } from "../modules/physiotherapist/physiotherapistRoutes"
import { signInRoutes } from "../modules/login/signInRoutes"

const activeRoutes = (application: Application): void => {
	physiotherapistRoutes(application)
	signInRoutes(application)
}

activeRoutes(app)
