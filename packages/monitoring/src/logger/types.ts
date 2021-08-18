/* eslint-disable class-methods-use-this, max-classes-per-file, @typescript-eslint/no-unused-vars */
type EventContext = Record<string, unknown>

enum LogLevel {
  Trace = "trace",
  Debug = "debug",
  Info = "info",
  Warn = "warn",
  Error = "error",
  Fatal = "fatal"
}

abstract class LoggerTransport {
  log(level: LogLevel, message: string, context?: EventContext) {}
}

abstract class ExceptionCapturer {
  captureException(error: Error, context?: EventContext) {}
  captureMessage(message: string, context?: EventContext) {}
}

export {LogLevel, LoggerTransport, ExceptionCapturer}
export type {EventContext}
