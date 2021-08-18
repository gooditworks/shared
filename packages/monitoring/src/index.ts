import Logger, {LoggerConfig} from "./logger"

interface Config {
  logger: LoggerConfig
}

const logger = new Logger({
  loggerTransports: [],
  exceptionCapturers: []
})

const init = (config: Config) => {
  logger.setConfig(config.logger)
}

export default init
export {logger}
