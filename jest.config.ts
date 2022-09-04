/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest"

const config: Config = {
    clearMocks: true,
    coverageProvider: "v8",
    testMatch: ["**/**/*.spec.ts"],
    preset: "ts-jest",
    displayName: "Cervical Spine Range Flex",
    maxConcurrency: 20,
}

export default config
