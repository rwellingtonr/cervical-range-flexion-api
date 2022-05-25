import { Request, Response, NextFunction } from "express"
import log from "../utils/loggers"

const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
	log.fatal({ message: err.message })
	if (err instanceof Error) {
		return res.status(400).json({ message: err.message })
	}
	return res.status(500).json({ status: "error", message: `Internal server error: ${err}` })
}
export { errorHandling }
