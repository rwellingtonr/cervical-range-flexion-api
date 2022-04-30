import { Request, Response } from "express"
import { logErr } from "../../utils/loggers"
import { getPatientHistory } from "./patientHistoryServices"

export const getHistory = async (req: Request, res: Response) => {
	try {
		const { patientId } = req.params

		const firstDate = req.query["firstDate"] as string
		const laseDate = req.query["laseDate"] as string

		await getPatientHistory(patientId, firstDate, laseDate)

		return res.status(200).json()
	} catch (error) {
		logErr(error.message)
		return res.status(404).json({ error: error.message })
	}
}
