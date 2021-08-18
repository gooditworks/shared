import {LogLevel, LoggerTransport, ExceptionCapturer, EventContext} from "./types"

interface LoggerConfig {
  loggerTransports: LoggerTransport[]
  exceptionCapturers: ExceptionCapturer[]
}

class Logger {
  config: LoggerConfig
  moduleStack: string[]

  constructor(config: LoggerConfig, moduleStack?: string[]) {
    this.config = config
    this.moduleStack = moduleStack || []
  }

  setConfig(newConfig: LoggerConfig) {
    this.config = newConfig
  }

  module(name: string): Logger {
    const newStack = [...this.moduleStack, name]
    const newLogger = new Logger(this.config, newStack)

    return newLogger
  }

  log(level: LogLevel, message: string, context?: EventContext) {
    const fullModule = this.moduleStack.join("::")
    const fullMessage = fullModule ? `${fullModule} ${message}` : message

    this.config.loggerTransports.forEach(transport => {
      transport.log(level, fullMessage, context)
    })
  }

  trace(message: string, context?: EventContext) {
    this.log(LogLevel.Trace, message, context)
  }
  debug(message: string, context?: EventContext) {
    this.log(LogLevel.Debug, message, context)
  }
  info(message: string, context?: EventContext) {
    this.log(LogLevel.Info, message, context)
  }
  warn(message: string, context?: EventContext) {
    this.log(LogLevel.Warn, message, context)
    this.captureMessage(`Warning log message: ${message}`, context)
  }
  error(message: string, context?: EventContext) {
    this.log(LogLevel.Error, message, context)
    this.captureMessage(`Error log message: ${message}`, context)
  }
  fatal(message: string, context?: EventContext) {
    this.log(LogLevel.Fatal, message, context)
    this.captureMessage(`Fatal log message: ${message}`, context)
  }

  captureException(exception: Error, context?: EventContext) {
    this.config.exceptionCapturers.forEach(capturer => {
      capturer.captureException(exception, context)
    })
  }
  captureMessage(message: string, context?: EventContext) {
    this.config.exceptionCapturers.forEach(capturer => {
      capturer.captureMessage(message, context)
    })
  }
}

export default Logger
export type {LoggerConfig}
