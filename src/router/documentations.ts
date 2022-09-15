import { Router } from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJson from "../config/swagger.json"

const documentationRouter = Router()
const mainRoute = "/documentation"

documentationRouter.use(mainRoute, swaggerUi.serve)
documentationRouter.get(mainRoute, swaggerUi.setup(swaggerJson))

export default documentationRouter
