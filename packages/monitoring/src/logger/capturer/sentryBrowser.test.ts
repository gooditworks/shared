/* eslint-disable import/first */

const initSpy = jest.fn()
const captureExceptionSpy = jest.fn()
const captureMessageSpy = jest.fn()

jest.mock("@sentry/browser", () => ({
  init: initSpy,
  captureException: captureExceptionSpy,
  captureMessage: captureMessageSpy
}))

import SentryBrowserCapturer from "./sentryBrowser"

test("@sentry/browser exception capturer calls Sentry.init on creating", () => {
  const options = {dsn: "__"}
  const capturer = new SentryBrowserCapturer(options)

  expect(initSpy).toBeCalledWith(options)
})

test("@sentry/browser exception capturer calls Sentry.captureException", () => {
  const capturer = new SentryBrowserCapturer({})
  const error = new Error("test error")
  const context = {ctx: true}

  capturer.captureException(error, context)

  expect(captureExceptionSpy).toBeCalledWith(error, context)
})

test("@sentry/browser exception capturer calls Sentry.captureMessage", () => {
  const capturer = new SentryBrowserCapturer({})
  const message = "something bad happen"
  const context = {ctx: true}

  capturer.captureMessage(message, context)

  expect(captureMessageSpy).toBeCalledWith(message, context)
})
