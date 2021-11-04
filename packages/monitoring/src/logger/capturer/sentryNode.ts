/* eslint-disable class-methods-use-this */

import * as Sentry from "@sentry/node"

import {EventContext, ExceptionCapturer} from "../types"

class SentryNodeCapturer extends ExceptionCapturer {
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

export default SentryNodeCapturer
export {Sentry}
