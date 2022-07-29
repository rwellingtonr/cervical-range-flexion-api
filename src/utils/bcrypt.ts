import bcrypt from "bcrypt"

export const hashPassword = async (psw: string) => {
    const saltTimes = 10
    const salt = await bcrypt.genSalt(saltTimes)
    const hash = await bcrypt.hash(psw, salt)
    return hash
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}
