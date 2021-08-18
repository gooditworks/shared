/* eslint-disable class-methods-use-this */

import logdna from "@logdna/browser"

import {LogLevel, EventContext, LoggerTransport} from "../types"

const logdnaLogFns: Record<LogLevel, typeof logdna.log> = {
  [LogLevel.Trace]: logdna.debug,
  [LogLevel.Debug]: logdna.debug,
  [LogLevel.Info]: logdna.info,
  [LogLevel.Warn]: logdna.warn,
  [LogLevel.Error]: logdna.error,
  [LogLevel.Fatal]: logdna.error
}

// Пакет @logdna/browser не экспортит типы
// https://github.com/logdna/logdna-browser/pull/13
type LogdnaBrowserOptions = Parameters<typeof logdna.init>[1]

class LogdnaBrowserTransport extends LoggerTransport {
  constructor(key: string, options?: LogdnaBrowserOptions) {
    super()

    logdna.init(key, {...options, console: false})
  }

  log(level: LogLevel, message: string, context?: EventContext) {
    const logdnaFn = logdnaLogFns[level]

    logdnaFn(message, {context})
  }
}

export default LogdnaBrowserTransport
