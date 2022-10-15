import "dotenv/config"
import "../middleware/gracefulShutDown"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { createServer } from "http"
import { errorHandling } from "@middleware/errorHandling"
import { router } from "@router/index"
import { Server } from "socket.io"

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(router)
app.use(errorHandling)

const serverHttp = createServer(app)

const io = new Server(serverHttp, {
    cors: {
        origin: "*",
    },
})

export { serverHttp, io }
