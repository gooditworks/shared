import {
  Logger,
  createLogger,
  ConstructorOptions,
  LogLevel as LogdnaLogLevel
} from "@logdna/logger"

import {LogLevel, EventContext, LoggerTransport} from "../types"

const logdnaLevels: Record<LogLevel, string> = {
  [LogLevel.Trace]: "trace",
  [LogLevel.Debug]: "debug",
  [LogLevel.Info]: "info",
  [LogLevel.Warn]: "warn",
  [LogLevel.Error]: "error",
  [LogLevel.Fatal]: "fatal"
}

class LogdnaNodeTransport extends LoggerTransport {
  logger: Logger

  constructor(key: string, options?: ConstructorOptions) {
    super()

    this.logger = createLogger(key, options)
  }

  log(level: LogLevel, message: string, context?: EventContext) {
    this.logger.log(message, {
      level: logdnaLevels[level] as unknown as LogdnaLogLevel, // https://github.com/logdna/logger-node/issues/47
      context
    })
  }
}

export default LogdnaNodeTransport
