import express, { Application } from "express"
import { resolve } from "path"
import { signInRoutes } from "../modules/login/signInRoutes"
import { patientRoutes } from "../modules/patient/patientRoutes"
import { patientHistoryRoutes } from "../modules/patientHistory/patientHistoryRoutes"
import log from "../utils/loggers"
import { ensureAuthenticated } from "../middleware/auth"
import * as physio from "../modules/physiotherapist/physiotherapistRoutes"

export const activeSafeRoutes = (app: Application) => {
	log.info("Starting safety routes...")
	app.use("/", ensureAuthenticated)
	patientRoutes(app)
	patientHistoryRoutes(app)
	physio.physiotherapistRoutes(app)
}

export const activeNormalRoutes = (app: Application) => {
	log.info("Starting normal routes...")
	app.use("/public", express.static(resolve("./public")))
	signInRoutes(app)
	physio.physiotherapistNormalRoutes(app)
}
