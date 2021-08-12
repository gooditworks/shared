import LogdnaNode from "@logdna/logger"
import * as SentryNode from "@sentry/node"

import Logger, {LoggerConfig} from "./logger"

interface MonitoringConfig {
  logger?: LoggerConfig
}

const init = (config: MonitoringConfig) => {
  const {logger} = config

  if (logger) {
    SentryNode.init({dsn: logger.sentryDsn})
    LogdnaNode.setupDefaultLogger(logger.logdnaIngestionKey, {
      app: logger.logdnaAppName
    })
  }
}

const globalLogger = new Logger()

export default init
export {globalLogger as logger}
export type {MonitoringConfig}
