import bcrypt from "bcrypt"

const hashPassword = async (psw: string): Promise<string> => {
	const saltTimes = 10
	const salt = await bcrypt.genSalt(saltTimes)
	const hash = await bcrypt.hash(psw, salt)
	return hash
}

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
	return await bcrypt.compare(password, hash)
}

export { hashPassword, comparePassword }
