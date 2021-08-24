/* eslint-disable import/first */

const consoleTraceSpy = jest.spyOn(console, "trace")
const consoleDebugSpy = jest.spyOn(console, "debug")
const consoleInfoSpy = jest.spyOn(console, "info")
const consoleWarnSpy = jest.spyOn(console, "warn")
const consoleErrorSpy = jest.spyOn(console, "error")

import ConsoleTransport from "./console"
import {LogLevel} from "../types"

test("console logger transport calls console functions", () => {
  const transport = new ConsoleTransport()
  const context = {ctx: true}

  transport.log(LogLevel.Trace, "trace message", context)
  expect(consoleTraceSpy).toBeCalledWith("trace message", context)

  transport.log(LogLevel.Debug, "debug message", context)
  expect(consoleDebugSpy).toBeCalledWith("debug message", context)

  transport.log(LogLevel.Info, "info message", context)
  expect(consoleInfoSpy).toBeCalledWith("info message", context)

  transport.log(LogLevel.Warn, "warn message", context)
  expect(consoleWarnSpy).toBeCalledWith("warn message", context)

  transport.log(LogLevel.Error, "error message", context)
  expect(consoleErrorSpy).toBeCalledWith("error message", context)

  transport.log(LogLevel.Fatal, "fatal message", context)
  expect(consoleErrorSpy).toBeCalledWith("fatal message", context)
})
