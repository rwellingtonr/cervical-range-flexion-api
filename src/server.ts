import "./modules/integration/socket"
import log from "./utils/loggers"
import { serverHttp } from "./app"

const { PORT } = process.env

serverHttp.listen(PORT, () => log.info(`Server running on port ${PORT}`))
