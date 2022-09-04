import log from "./loggers"
export const errorCb = (err: Error) => {
    if (err) return log.error("Error on write: ", err.message)
}
