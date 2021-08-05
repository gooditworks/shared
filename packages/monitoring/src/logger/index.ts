/* eslint-disable no-console */

import Logdna, {LogLevel as LogDNALogLevel} from "@logdna/logger"
import * as Sentry from "@sentry/minimal"

interface LoggerConfig {
  logdnaAppName?: string
  logdnaIngestionKey: string
  sentryDsn?: string
}

type LogEntryContext = Record<string, unknown>

enum LogLevel {
  Trace = "trace",
  Debug = "debug",
  Info = "info",
  Warn = "warn",
  Error = "error",
  Fatal = "fatal"
}

const consoleLogFns: Record<LogLevel, typeof console.log> = {
  [LogLevel.Trace]: console.trace,
  [LogLevel.Debug]: console.debug,
  [LogLevel.Info]: console.info,
  [LogLevel.Warn]: console.warn,
  [LogLevel.Error]: console.error,
  [LogLevel.Fatal]: console.error
}

const isProduction = process.env.NODE_ENV === "production"

const sentryCaptureMessage = (message: string, context?: LogEntryContext) => {
  if (isProduction) {
    Sentry.captureMessage(message, context)
  }
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
    const fullMessage = fullModule ? `${fullModule} ${message}` : message

    const consoleLogFn = consoleLogFns[level]
    consoleLogFn(fullMessage, context || "")

    if (isProduction) {
      try {
        const logDna = Logdna.setupDefaultLogger("")
        logDna.log(fullMessage, {
          level: level as unknown as LogDNALogLevel,
          context
        })
      } catch (error) {
        console.warn("LogDNA error (monitoring is not initialized?): ", error)
      }
    }
  }

  trace(message: string, context?: LogEntryContext) {
    this.log(LogLevel.Trace, message, context)
  }

  debug(message: string, context?: LogEntryContext) {
    this.log(LogLevel.Debug, message, context)
  }

  info(message: string, context?: LogEntryContext) {
    this.log(LogLevel.Info, message, context)
  }

  warn(message: string, context?: LogEntryContext) {
    this.log(LogLevel.Warn, message, context)

    sentryCaptureMessage(`Warning log message: ${message}`, context)
  }

  error(message: string, context?: LogEntryContext) {
    this.log(LogLevel.Error, message, context)

    sentryCaptureMessage(`Error log message: ${message}`, context)
  }

  fatal(message: string, context?: LogEntryContext) {
    this.log(LogLevel.Fatal, message, context)

    sentryCaptureMessage(`Fatal log message: ${message}`, context)
  }

  captureException(exception: Error, context?: LogEntryContext) {
    this.error(`Exception: ${exception.message}`, context)

    if (isProduction) {
      Sentry.captureException(exception, context)
    }
  }
}

export type {LoggerConfig}
export default Logger
