# @gooditworks/monitoring

Утилита для мониторинга приложений, включающая в себя:

- Логгер с поддержкой нескольких уровней логгирования, отправкой логов в LogDNA и исключений в Sentry

```ts
import {logger} from "@gooditworks/monitoring"

logger.info("something happen")
logger.error("shit happens")

const apiLogger = logger.module("api")
api.warn("warning in API handler", {requestId: 42})

try {
  dangerousAction()
} catch (error) {
  logger.captureException(error)
}
```

## Использование

### Установка

Установить пакет `@gooditworks/monitoring` стандартными средствами (см. [использование shared библиотек](readme.md#Использование))

```
npm i @gooditworks/monitoring
```

### Инициализация

Пакет должен быть инициализирован перед использованием. Это делает функция `initMonitoring`, экспортируемая по-умолчанию (`export default`). Необходимо выбрать, импортировать и инициализировать необходимые модули и вызвать функцию инициализации. Изначально включены только `ConsoleTransport` и `ConsoleCapturer`.

#### Пример для Node окружения
```ts
import initMonitoring from "@gooditworks/monitoring"

import ConsoleTransport from "@gooditworks/monitoring/logger/transport/console"
import LogdnaNodeTransport from "@gooditworks/monitoring/logger/transport/logdnaNode"
import ConsoleCapturer from "@gooditworks/monitoring/logger/capturer/console"
import SentryNodeCapturer from "@gooditworks/monitoring/logger/capturer/sentryNode"

initMonitoring({
  logger: {
    loggerTransports: [
      new ConsoleTransport(),
      new LogdnaNodeTransport("0123456789abcdef", {appName: "readme"})
    ]
    exceptionCapturers: [
      new ConsoleCapturer(),
      new SentryNodeCapturer({dsn: "https://__DSN__"})
    ]
  }
})
```

#### Пример для браузерного окружения
```ts
import initMonitoring from "@gooditworks/monitoring"

import ConsoleTransport from "@gooditworks/monitoring/logger/transport/console"
import LogdnaBrowserTransport from "@gooditworks/monitoring/logger/transport/logdnaBrowser"
import ConsoleCapturer from "@gooditworks/monitoring/logger/capturer/console"
import SentryBrowserCapturer from "@gooditworks/monitoring/logger/capturer/sentryBrowser"

initMonitoring({
  logger: {
    loggerTransports: [
      new ConsoleTransport(),
      new LogdnaBrowserTransport("0123456789abcdef", {appName: "readme"})
    ]
    exceptionCapturers: [
      new ConsoleCapturer(),
      new SentryBrowserCapturer({dsn: "https://__DSN__"})
    ]
  }
})
```

### Модули логгера

#### `ConsoleTransport`
Отображает сообщения в консоли используя стандартный `console.log`. Не имеет параметров.

```ts
import ConsoleTransport from "@gooditworks/monitoring/logger/transport/console"

const transport = new ConsoleTransport()
```

#### `LogdnaNodeTransport`
Интеграция logDNA для окружения Node. Использует [`@logdna/logger`](https://www.npmjs.com/package/@logdna/logger). Принимает такие же параметры, что и [`createLogger`](https://www.npmjs.com/package/@logdna/logger#createloggerkey-options).

```ts
import LogdnaNodeTransport from "@gooditworks/monitoring/logger/transport/logdnaNode"

const transport = new LogdnaNodeTransport("0123456789abcdef", {app: "superapp"})
```

#### `LogdnaBrowserTransport`
Интеграция logDNA для браузерного окружения. Использует [`@logdna/browser`](https://www.npmjs.com/package/@logdna/browser). Принимает такие же параметры, как и при [инициализации `@logdna/browser`](https://www.npmjs.com/package/@logdna/browser#configuration-options).   
** Не забудьте [добавить домен в параметры CORS](https://www.npmjs.com/package/@logdna/browser#enable-cors-in-logdna)! **

```ts
import LogdnaBrowserTransport from "@gooditworks/monitoring/logger/transport/logdnaBrowser"

const transport = new LogdnaBrowserTransport("0123456789abcdef", {app: "smolapp"})
```

#### `ConsoleCapturer`
Отображает ошибки (exceptions) в консоли используя стандартный `console.log`. Не имеет параметров.

#### `SentryNodeCapturer`
Интеграция Sentry для окружения Node. Использует [`@sentry/node`](https://www.npmjs.com/package/@sentry/node) и принимает [его параметры](https://docs.sentry.io/platforms/node/configuration/options).

```ts
import SentryNodeCapturer from "@gooditworks/monitoring/logger/capturer/sentryNode"

const transport = new SentryNodeCapturer({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0"
})
```

#### `SentryBrowserCapturer`
Интеграция Sentry для браузерного окружения. Использует [`@sentry/browser`](https://www.npmjs.com/package/@sentry/browser) и принимает [его параметры](https://docs.sentry.io/platforms/javascript/configuration/options/).

```ts
import SentryBrowserCapturer from "@gooditworks/monitoring/logger/capturer/sentryBrowser"

const transport = new SentryBrowserCapturer({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0"
})
```
