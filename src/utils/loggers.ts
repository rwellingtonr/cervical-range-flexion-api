const time = () => new Date().toLocaleTimeString()

const logInfo = (...info: any[]) => console.log(`[Info] at ${time()}: `, ...info)

const logErr = (...err: any[]) => console.error(`[Error] at ${time()}: `, ...err)

export { logInfo, logErr }
