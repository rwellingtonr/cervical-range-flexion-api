import "dotenv/config"
import express from "express"
import cors from "cors"
import { createServer } from "http"
import { errorHandling } from "../middleware/errorHandling"
import { activeRoutes } from "../router"

const app = express()

app.use(express.json())
app.use(cors())
app.use(errorHandling)

activeRoutes(app)

const serverHttp = createServer(app)

export { serverHttp }
