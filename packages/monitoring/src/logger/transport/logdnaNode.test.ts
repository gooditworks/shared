/* eslint-disable import/first */

const logSpy = jest.fn()
const createLoggerSpy = jest.fn().mockImplementation(() => ({log: logSpy}))

jest.mock("@logdna/logger", () => ({
  createLogger: createLoggerSpy
}))

import {LogLevel} from "../types"
import LogdnaNodeTransport from "./logdnaNode"

test("LogdnaNodeTransport initialize @logdna/logger", () => {
  const key = "0123456789abcdef"
  const options = {app: "test"}

  const transport = new LogdnaNodeTransport(key, options)

  expect(createLoggerSpy).toBeCalledWith(key, options)
})

test("LogdnaNodeTransport calls logDNA's log function", () => {
  const transport = new LogdnaNodeTransport("0123456789abcdef", {app: "test"})
  const context = {ctx: true}

  transport.log(LogLevel.Trace, "trace message", context)
  expect(logSpy).toBeCalledWith("trace message", {level: "trace", context})

  transport.log(LogLevel.Debug, "debug message", context)
  expect(logSpy).toBeCalledWith("debug message", {level: "debug", context})

  transport.log(LogLevel.Info, "info message", context)
  expect(logSpy).toBeCalledWith("info message", {level: "info", context})

  transport.log(LogLevel.Warn, "warn message", context)
  expect(logSpy).toBeCalledWith("warn message", {level: "warn", context})

  transport.log(LogLevel.Error, "error message", context)
  expect(logSpy).toBeCalledWith("error message", {level: "error", context})

  transport.log(LogLevel.Fatal, "fatal message", context)
  expect(logSpy).toBeCalledWith("fatal message", {level: "fatal", context})
})
