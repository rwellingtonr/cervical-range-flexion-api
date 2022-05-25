import { serverHttp } from "./app"
import log from "./utils/loggers"

const { PORT } = process.env

serverHttp.listen(PORT, () => log.info(`Server running on port ${PORT}`))
