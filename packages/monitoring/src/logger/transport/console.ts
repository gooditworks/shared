/* eslint-disable class-methods-use-this, no-console */
import {LogLevel, EventContext, LoggerTransport} from "../types"

const consoleLogFns: Record<LogLevel, typeof console.log> = {
  [LogLevel.Trace]: console.trace,
  [LogLevel.Debug]: console.debug,
  [LogLevel.Info]: console.info,
  [LogLevel.Warn]: console.warn,
  [LogLevel.Error]: console.error,
  [LogLevel.Fatal]: console.error
}

class ConsoleTransport extends LoggerTransport {
  log(level: LogLevel, message: string, context?: EventContext) {
    const consoleLogFn = consoleLogFns[level]

    consoleLogFn(message, context || "")
  }
}

export default ConsoleTransport
