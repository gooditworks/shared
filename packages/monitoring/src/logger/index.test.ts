/* eslint-disable max-classes-per-file */

import Logger from "./index"
import {EventContext, ExceptionCapturer, LoggerTransport, LogLevel} from "./types"

class TestLoggerTransport extends LoggerTransport {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fake: any = jest.fn()

  log(level: LogLevel, message: string, context?: EventContext) {
    return this.fake(level, message, context)
  }
}

class TestExceptionCapturer extends ExceptionCapturer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fake: any = jest.fn()

  captureException(error: Error, context?: EventContext) {
    return this.fake(error, context)
  }

  captureMessage(message: string, context?: EventContext) {
    return this.fake(message, context)
  }
}

test("Logger copies module stack", () => {
  const logger = new Logger({loggerTransports: [], exceptionCapturers: []})

  expect(logger.moduleStack).toEqual([])

  const aLogger = logger.module("a")
  expect(aLogger.moduleStack).toEqual(["a"])

  const bLogger = aLogger.module("b")
  expect(bLogger.moduleStack).toEqual(["a", "b"])

  const cLogger = bLogger.module("c")
  expect(cLogger.moduleStack).toEqual(["a", "b", "c"])
})

test("Logger calls log in logger transports", () => {
  const aTransport = new TestLoggerTransport()
  const bTransport = new TestLoggerTransport()

  const logger = new Logger({
    loggerTransports: [aTransport, bTransport],
    exceptionCapturers: []
  })

  const context = {ctx: true}

  logger.log(LogLevel.Fatal, "fatalala", context)
  expect(aTransport.fake).toBeCalledWith(LogLevel.Fatal, "fatalala", context)
  expect(bTransport.fake).toBeCalledWith(LogLevel.Fatal, "fatalala", context)

  logger.trace("message", context)
  expect(aTransport.fake).toBeCalledWith(LogLevel.Trace, "message", context)
  expect(bTransport.fake).toBeCalledWith(LogLevel.Trace, "message", context)
})

test("Logger calls captureException in exception capturers", () => {
  const aCapturer = new TestExceptionCapturer()
  const bCapturer = new TestExceptionCapturer()

  const logger = new Logger({
    loggerTransports: [],
    exceptionCapturers: [aCapturer, bCapturer]
  })

  const error = new Error("oh my")
  const context = {ctx: true}

  logger.captureException(error, context)
  expect(aCapturer.fake).toBeCalledWith(error, context)
  expect(bCapturer.fake).toBeCalledWith(error, context)
})

test("Logger calls captureMessage in exception capturers", () => {
  const aCapturer = new TestExceptionCapturer()
  const bCapturer = new TestExceptionCapturer()

  const logger = new Logger({
    loggerTransports: [],
    exceptionCapturers: [aCapturer, bCapturer]
  })

  const error = "oh my, its string message"
  const context = {ctx: true}

  logger.captureMessage(error, context)
  expect(aCapturer.fake).toBeCalledWith(error, context)
  expect(bCapturer.fake).toBeCalledWith(error, context)
})

test("Logger calls logger and capturer on warn, error and fatal log messages", () => {
  const transport = new TestLoggerTransport()
  const capturer = new TestExceptionCapturer()
  const logger = new Logger({
    loggerTransports: [transport],
    exceptionCapturers: [capturer]
  })

  const context = {ctx: true}

  logger.warn("warn message", context)
  expect(transport.fake).toBeCalledWith(LogLevel.Warn, "warn message", context)
  expect(capturer.fake).toBeCalledWith("Warning log message: warn message", context)

  logger.error("error message", context)
  expect(transport.fake).toBeCalledWith(LogLevel.Error, "error message", context)
  expect(capturer.fake).toBeCalledWith("Error log message: error message", context)

  logger.fatal("fatal message", context)
  expect(transport.fake).toBeCalledWith(LogLevel.Fatal, "fatal message", context)
  expect(capturer.fake).toBeCalledWith("Fatal log message: fatal message", context)
})

test("Logger calls logger and capturer on exception capture", () => {
  const transport = new TestLoggerTransport()
  const capturer = new TestExceptionCapturer()
  const logger = new Logger({
    loggerTransports: [transport],
    exceptionCapturers: [capturer]
  })

  const error = new Error("sad")
  const context = {ctx: true}

  logger.captureException(error, context)
  expect(transport.fake).toBeCalledWith(LogLevel.Error, "Error: sad", context)
  expect(capturer.fake).toBeCalledWith(error, context)
})
