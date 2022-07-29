import { randomUUID } from "crypto"
import { handleEncrypt, handleDecrypt } from "./encrypt"
describe("Testing to encrypt some string", () => {
    let randomId: string
    beforeAll(() => {
        randomId = randomUUID()
    })

    it("Should encrypt the string", () => {
        const hash = handleEncrypt(randomId)
        expect(hash).not.toEqual(randomId)
        expect(typeof hash).toBe("string")
    })

    it("Should decrypt the string", () => {
        const payload = handleDecrypt(handleEncrypt(randomId))
        expect(payload).toEqual(randomId)
    })

    it("Should return an error", () => {
        const uuid = randomUUID()
        const payload = handleDecrypt(handleEncrypt(randomId))
        expect(payload).not.toEqual(uuid)
    })
})
