import log4js from "log4js"

log4js.configure({
	appenders: {
		out: {
			type: "stdout",
			layout: {
				type: "pattern",
				pattern: "%[[%d{dd/MM/yy hh:mm:ss}] [%p] %c:%] %m",
			},
		},
	},
	categories: { default: { appenders: ["out"], level: "all" } },
})
const logger = log4js.getLogger("Messenger")

export default logger
