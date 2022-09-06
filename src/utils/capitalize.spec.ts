import { capitalize } from "./capitalize"

test("should capitalize the text", () => {
    const expected = "Jest Test Config"
    const lowerCase = expected.toLowerCase()
    expect(capitalize(lowerCase)).toEqual(expected)
})
