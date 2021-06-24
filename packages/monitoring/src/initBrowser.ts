import LogdnaBrowser from "@logdna/browser"
import * as SentryBrowser from "@sentry/browser"
import {install as installGtag} from "ga-gtag"

import {MonitoringConfig} from "."

const init = (config: MonitoringConfig) => {
  const {logger, analytics} = config

  SentryBrowser.init({dsn: logger.sentryDsn})
  LogdnaBrowser.init(logger.logdnaIngestionKey, {
    app: logger.logdnaAppName
  })

  installGtag(analytics.measurementId)
}

export default init
export type {MonitoringConfig}
