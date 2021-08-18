import {
  Logger,
  createLogger,
  ConstructorOptions,
  LogLevel as LogdnaLogLevel
} from "@logdna/logger"

import {LogLevel, EventContext, LoggerTransport} from "../types"

class LogdnaNodeTransport extends LoggerTransport {
  logger: Logger

  constructor(key: string, options?: ConstructorOptions) {
    super()

    this.logger = createLogger(key, options)
  }

  log(level: LogLevel, message: string, context?: EventContext) {
    this.logger.log(message, {
      level: level as unknown as LogdnaLogLevel,
      context
    })
  }
}

export default LogdnaNodeTransport
