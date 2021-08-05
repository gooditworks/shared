/* eslint-disable no-console, import/first */

jest.spyOn(global.console, "error").mockImplementation(() => {})
const consoleTraceSpy = jest.spyOn(global.console, "trace")

const logdnaLogSpy = jest.fn()
const setupDefaultLoggerSpy = jest.fn().mockImplementation(() => ({
  log: logdnaLogSpy
}))
jest.mock("@logdna/logger", () => ({
  setupDefaultLogger: setupDefaultLoggerSpy
}))

const sentryCaptureMessageSpy = jest.fn()
const sentryCaptureExceptionSpy = jest.fn()
jest.mock("@sentry/minimal", () => ({
  captureMessage: sentryCaptureMessageSpy,
  captureException: sentryCaptureExceptionSpy
}))

process.env.NODE_ENV = "production"

import Logger from "."

describe("logger works correctly", () => {
  it("copies module stack on Logger.module", () => {
    const empty = new Logger()
    expect(empty.moduleStack).toEqual([])

    const aModule = empty.module("a")
    expect(aModule.moduleStack).toEqual(["a"])

    const bModule = aModule.module("b")
    expect(bModule.moduleStack).toEqual(["a", "b"])
  })

  it("calls console.log", () => {
    const logger = new Logger()
    logger.trace("message", {ctx: true})

    expect(consoleTraceSpy).toHaveBeenCalledWith("message", {ctx: true})
  })

  it("calls LogDNA", () => {
    const logger = new Logger()
    logger.error("message", {ctx: true})

    expect(setupDefaultLoggerSpy).lastCalledWith("")
    expect(logdnaLogSpy).lastCalledWith("message", {
      level: "error",
      context: {ctx: true}
    })
  })

  it("calls Sentry on warn/error/fatal", () => {
    const logger = new Logger()
    logger.error("oh no", {ctx: true})

    const sentryMessage = "Error log message: oh no"
    expect(sentryCaptureMessageSpy).lastCalledWith(sentryMessage, {ctx: true})
  })

  it("calls LogDNA and Sentry on captureException", () => {
    const logger = new Logger()

    const error = new Error("shit happens")
    logger.captureException(error, {ctx: true})

    expect(sentryCaptureExceptionSpy).lastCalledWith(error, {ctx: true})
    expect(logdnaLogSpy).lastCalledWith("Exception: shit happens", {
      level: "error",
      context: {ctx: true}
    })
  })
})
