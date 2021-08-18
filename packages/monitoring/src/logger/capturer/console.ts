/* eslint-disable class-methods-use-this, no-console */

import {EventContext, ExceptionCapturer} from "../types"

class ConsoleCapturer extends ExceptionCapturer {
  captureException(error: Error, context?: EventContext) {
    console.error(error, context || "")
  }
}

export default ConsoleCapturer
