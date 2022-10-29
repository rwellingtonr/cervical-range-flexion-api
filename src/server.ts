import "./lib/moduleAlias"
import "@modules/integration/socket"
import log from "@utils/loggers"
import { serverHttp } from "@app/index"

serverHttp.listen(process.env.PORT, () => {
    log.info(`Server running process id ${process.pid} on port ${process.env.PORT}`)
})
