import "dotenv/config"
import express from "express"
import cors from "cors"
import { createServer } from "http"
import { errorHandling } from "../middleware/errorHandling"
import { initializeRoutes } from "../router"
import { Server } from "socket.io"

import "../config/serialPort"

const app = express()

app.use(express.json())
app.use(cors())
app.use(errorHandling)

initializeRoutes(app)

const serverHttp = createServer(app)

const io = new Server(serverHttp, {
    cors: {
        origin: "*",
    },
})

export { serverHttp, io }
