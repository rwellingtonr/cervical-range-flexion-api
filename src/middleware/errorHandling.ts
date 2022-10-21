import "express-async-errors"
import { Request, Response, NextFunction } from "express"
import log from "@utils/loggers"

interface ErrorHandling {
    (err: Error, req: Request, res: Response, next: NextFunction): void | Response
}

const errorHandling: ErrorHandling = (err, req, res, next) => {
    log.fatal(err.message)
    if (err instanceof Error) return next(err)

    return res.status(500).json({
        status: "error",
        message: `Internal server error: ${err}`,
    })
}
export { errorHandling }
