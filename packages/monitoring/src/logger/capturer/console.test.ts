/* eslint-disable import/first */
const consoleErrorSpy = jest.spyOn(console, "error")

import ConsoleCapturer from "./console"

test("console exception capturer calls console.error", () => {
  const capturer = new ConsoleCapturer()
  const error = new Error("test error")
  const context = {ctx: true}

  capturer.captureException(error, context)

  expect(consoleErrorSpy).toBeCalledWith(error, context)
})
