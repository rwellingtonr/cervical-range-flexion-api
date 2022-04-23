const logInfo = (info: any) => console.log(`${Date()} - Info: `, info)

const logErr = (err: any) => console.error(`${Date()} - Error: `, err)

export { logInfo, logErr }
