/* eslint-disable class-methods-use-this, max-classes-per-file, @typescript-eslint/no-unused-vars */
type EventContext = Record<string, unknown>

enum LogLevel {
  Trace = 1,
  Debug = 2,
  Info = 3,
  Warn = 4,
  Error = 5,
  Fatal = 6
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
