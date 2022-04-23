import { serverHttp } from "./app"
import { logInfo } from "./utils/loggers"

const { PORT } = process.env

serverHttp.listen(PORT, () => logInfo(`Running on port ${PORT}`))
