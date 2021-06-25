# @gooditworks/monitoring-next

Расширения @gooditworks/monitoring для Next.js:

- Отправка source maps в Sentry при production сборке

## Использование

Установить пакет `@gooditworks/monitoring-next` стандартными средствами (см. [использование shared библиотек](readme.md#Использование))

```
npm i @gooditworks/monitoring-next
```

Инициализировать плагин:

```js
// next.config.js

const {withSentrySourceMaps} = require("@gooditworks/monitoring-next")

const sentryEnv = {
  dsn: process.env.SENTRY_DSN, // https://public@sentry.example.com/1
  org: process.env.SENTRY_ORG, // gooditworks
  project: process.env.SENTRY_PROJECT, // cook-web
  authToken: process.env.SENTRY_AUTH_TOKEN,
  release: process.env.VERCEL_GIT_COMMIT_SHA, // or any other release string
  nodeEnv: process.env.NODE_ENV // sending source maps only in production
}

module.exports = withSentrySourceMaps(sentryEnv)
```

Если требуется изменить конфигурацию Next.js или использовать другие плагины - их нужно передать вторым аргументом в функцию `withSentrySourceMaps` (`withSentrySourceMaps` должен быть последним/корневым), например:

```js
const {withSentrySourceMaps} = require("@gooditworks/monitoring-next")
const otherNextPlugin = require("@next/other-plugin")

const otherPlugin = otherNextPlugin({...})

module.exports = withSentrySourceMaps(sentryEnv, {
  ...otherPlugin,
  images: {
    domains: ["images_cdn.io"]
  }
})
```

Но при этом хук Webpack будет перезаписан в любом случае. То есть сейчас нет возможности дополнительно изменять конфигурацию Webpack.
