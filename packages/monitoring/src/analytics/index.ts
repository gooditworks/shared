/* eslint-disable class-methods-use-this */

import {GtagOptions} from "ga-gtag"

interface AnalyticsConfig {
  measurementId: string
}

class Analytics {
  event(name: string, options?: GtagOptions) {
    return gtag("event", name, options)
  }
}

export default Analytics
export type {AnalyticsConfig}
