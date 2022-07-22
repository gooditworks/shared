/* eslint-disable class-methods-use-this */

import * as Sentry from "@sentry/nextjs"

import {EventContext, ExceptionCapturer} from "../types"

class SentryNextCapturer extends ExceptionCapturer {
  constructor(options: Sentry.NodeOptions) {
    super()

    Sentry.init(options)
  }

  captureException(error: Error, context?: EventContext) {
    Sentry.captureException(error, context)
  }

  captureMessage(message: string, context?: EventContext) {
    Sentry.captureMessage(message, context)
  }
}

export default SentryNextCapturer
export {Sentry}
