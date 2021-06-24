import LogdnaNode from "@logdna/logger"
import * as SentryNode from "@sentry/node"

import {MonitoringConfig} from "."

const init = (config: MonitoringConfig) => {
  const {logger} = config

  SentryNode.init({dsn: logger.sentryDsn})
  LogdnaNode.setupDefaultLogger(logger.logdnaIngestionKey, {
    app: logger.logdnaAppName
  })
}

export default init
export type {MonitoringConfig}
