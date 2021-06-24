/* eslint-disable no-console */

import Logdna, {LogLevel} from "@logdna/logger"
import * as Sentry from "@sentry/minimal"

interface LoggerConfig {
  logdnaAppName?: string
  logdnaIngestionKey: string
  sentryDsn: string
}

type LogEntryContext = Record<string, unknown>

const consoleLogFns: Record<LogLevel, typeof console.log> = {
  [LogLevel.trace]: console.trace,
  [LogLevel.debug]: console.debug,
  [LogLevel.info]: console.info,
  [LogLevel.warn]: console.warn,
  [LogLevel.error]: console.error,
  [LogLevel.fatal]: console.error
}

class Logger {
  moduleStack: string[]

  constructor(moduleStack?: string[]) {
    this.moduleStack = moduleStack || []
  }

  module(name: string): Logger {
    const newStack = [...this.moduleStack, name]

    return new Logger(newStack)
  }

  log(level: LogLevel, message: string, context?: LogEntryContext) {
    const fullModule = this.moduleStack.join("::")
    const fullMessage = `${fullModule} ${message}`

    const consoleLogFn = consoleLogFns[level]
    consoleLogFn(fullMessage, context)

    const logDna = Logdna.setupDefaultLogger("")
    logDna.log(fullMessage, {level, context})
  }

  trace(message: string, context?: LogEntryContext) {
    this.log(LogLevel.trace, message, context)
  }

  debug(message: string, context?: LogEntryContext) {
    this.log(LogLevel.debug, message, context)
  }

  info(message: string, context?: LogEntryContext) {
    this.log(LogLevel.info, message, context)
  }

  warn(message: string, context?: LogEntryContext) {
    this.log(LogLevel.warn, message, context)
    Sentry.captureMessage(`Warning log message: ${message}`, context)
  }

  error(message: string, context?: LogEntryContext) {
    this.log(LogLevel.error, message, context)
    Sentry.captureMessage(`Error log message: ${message}`, context)
  }

  fatal(message: string, context?: LogEntryContext) {
    this.log(LogLevel.fatal, message, context)
    Sentry.captureMessage(`Fatal log message: ${message}`, context)
  }

  captureException(exception: Error, context?: LogEntryContext) {
    this.error(`Exception: ${exception.message}`, context)
    Sentry.captureException(exception, context)
  }
}

export type {LoggerConfig}
export default Logger
