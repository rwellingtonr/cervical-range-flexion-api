import "dotenv/config"
import CryptoJS from "crypto-js"

export const handleEncrypt = (payload: string) => {
    const hash = CryptoJS.AES.encrypt(payload, process.env.CRYPTOGRAPHY_PAYLOAD)
    return hash.toString()
}

export const handleDecrypt = (hash: string) => {
    const bytes = CryptoJS.AES.decrypt(hash, process.env.CRYPTOGRAPHY_PAYLOAD)
    const original = bytes.toString(CryptoJS.enc.Utf8)
    return original
}
