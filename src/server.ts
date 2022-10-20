import "module-alias/register"
import "@modules/integration/socket"
import log from "@utils/loggers"
import { serverHttp } from "@app/index"

const { PORT } = process.env

serverHttp.listen(PORT, () => log.info(`Server running on port ${PORT}`))
