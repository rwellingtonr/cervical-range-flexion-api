import "dotenv/config"
import "../middleware/gracefulShutDown"
import express from "express"
import cors from "cors"
import { createServer } from "http"
import { errorHandling } from "../middleware/errorHandling"
import { router } from "../router"
import { Server } from "socket.io"

const app = express()
app.use(express.json())
app.use(cors())
app.use(errorHandling)
app.use(router)

const serverHttp = createServer(app)

const io = new Server(serverHttp, {
    cors: {
        origin: "*",
    },
})

export { serverHttp, io }
