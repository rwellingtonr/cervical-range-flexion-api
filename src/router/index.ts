import express, { Application } from "express"
import { resolve } from "path"
import { signInRoutes } from "../modules/login/signInRoutes"
import { patientRoutes } from "../modules/patient/patientRoutes"
import { patientHistoryRoutes } from "../modules/patientHistory/patientHistoryRoutes"
import { ensureAuthenticated } from "../middleware/auth"
import log from "../utils/loggers"
import * as physio from "../modules/physiotherapist/physiotherapistRoutes"

export const initializeRoutes = (app: Application) => {
  activeNormalRoutes(app)
  activeSafetyRoutes(app)
}

const activeNormalRoutes = (app: Application) => {
  log.info("Starting normal routes...")
  app.use("/public", express.static(resolve("./public")))
  signInRoutes(app)
  physio.physiotherapistNormalRoutes(app)
}
const activeSafetyRoutes = (app: Application) => {
  log.info("Starting safety routes...")
  app.use("/", ensureAuthenticated)
  patientRoutes(app)
  patientHistoryRoutes(app)
  physio.physiotherapistRoutes(app)
}
