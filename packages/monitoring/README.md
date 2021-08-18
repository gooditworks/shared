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

Пакет должен быть инициализирован перед использованием. Это делает функция `init`, экспортируемая по-умолчанию (`export default`).

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