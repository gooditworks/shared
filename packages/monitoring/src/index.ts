/* eslint-disable import/no-mutable-exports */

import Logger, {LoggerConfig} from "./logger"
import Analytics, {AnalyticsConfig} from "./analytics"

interface MonitoringConfig {
  logger: LoggerConfig
  analytics: AnalyticsConfig
}

const globalLogger = new Logger()
const globalAnalytics = new Analytics()

export type {MonitoringConfig}
export {globalLogger as logger, globalAnalytics as analytics}
