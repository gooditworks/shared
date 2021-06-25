/* eslint-disable no-console */

import SentryWebpackPlugin from "@sentry/webpack-plugin"
import type {Configuration as WebpackConfiguration} from "webpack"

interface SentryEnv {
  dsn?: string
  org?: string
  project?: string
  authToken?: string
  release?: string
  nodeEnv?: string
}

type BaseConfig = Record<string, unknown>

const webpackHook = (env: SentryEnv) => (config: WebpackConfiguration) => {
  const {dsn, org, project, authToken, release, nodeEnv} = env
  const isProduction = nodeEnv === "production"

  if (dsn && org && project && authToken && release && isProduction) {
    const plugin = new SentryWebpackPlugin({
      include: ".next",
      ignore: ["node_modules"],
      urlPrefix: "~/_next",
      release,
      authToken,
      org
    })

    if (!config.plugins) {
      // eslint-disable-next-line no-param-reassign
      config.plugins = []
    }

    config.plugins.push(plugin)
  } else if (isProduction) {
    console.warn("NODE_ENV === 'production', but some Sentry env vars not found")
    console.warn("SentryWebpackPlugin not enabled")
  }

  return config
}

const withSentrySourceMaps = (env: SentryEnv, baseConfig?: BaseConfig) => {
  return {
    ...baseConfig,
    productionBrowserSourceMaps: true,
    webpack: webpackHook(env)
  }
}

// eslint-disable-next-line import/prefer-default-export
export {withSentrySourceMaps}
