import express from "express"
import cors from "cors"
import { createServer } from "http"

const app = express()

app.use(express.json())
app.use(cors())

const serverHttp = createServer(app)

export { serverHttp }