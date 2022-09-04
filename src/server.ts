import { serverHttp } from "./app"
import log from "./utils/loggers"
import "./modules/integration/socket"

const { PORT } = process.env

serverHttp.listen(PORT, () => log.info(`Server running on port ${PORT}`))
