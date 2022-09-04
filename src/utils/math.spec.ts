import { calcMax } from "./math"

test("should return the maximum value of an array", () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 10, 8, 9, 0]
    expect(calcMax(numbers)).toBe(10)
})
