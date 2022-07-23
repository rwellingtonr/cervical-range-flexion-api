import { comparePassword, hashPassword } from "./bcrypt"

describe("it should test the cryptography", () => {
    it("should create and hash", async () => {
        const psw = "jest"
        const hash = await hashPassword(psw)

        expect(hash).not.toEqual(psw)
    })

    it("Should compare a psw", async () => {
        const psw = "jest"
        const hash = await hashPassword(psw)
        const decrypt = await comparePassword(psw, hash)

        expect(decrypt).toBe(true)
    })

    it("Should be different", async () => {
        const psw = "jest"
        const fake = "fake"
        const hash = await hashPassword(psw)
        const decrypt = await comparePassword(fake, hash)

        expect(decrypt).toBe(false)
    })
})
