import Logger, {LoggerConfig} from "./logger"
import ConsoleTransport from "./logger/transport/console"
import ConsoleCapturer from "./logger/capturer/console"

interface Config {
  logger: LoggerConfig
}

const logger = new Logger({
  loggerTransports: [new ConsoleTransport()],
  exceptionCapturers: [new ConsoleCapturer()]
})

const init = (config: Config) => {
  logger.setConfig(config.logger)
}

export default init
export {logger}
