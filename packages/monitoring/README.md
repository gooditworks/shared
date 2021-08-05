# @gooditworks/monitoring

Утилита для мониторинга приложений, включающая в себя:

- Логгер с поддержкой нескольких уровней логгирования, отправкой логов в LogDNA и исключений в Sentry

## Использование

Установить пакет `@gooditworks/monitoring` стандартными средствами (см. [использование shared библиотек](readme.md#Использование))

```
npm i @gooditworks/monitoring
```

### Инициализация

Пакет должен быть инициализирован перед использованием. Для этого нужно он экспортирует функцию инициализации, которая должна быть выполнена в entrypoint приложения:

```typescript
import initMonitoring from "@gooditworks/monitoring"

initMonitoring({
  logger: {
    sentryDsn: "https://public@sentry.example.com/1",
    logdnaIngestionKey: "abcdef1234567890",
    logdnaAppName: "monitoring example"
  }
})
```

После инициализации пакет можно использовать в любом месте приложения:

```typescript
import {logger} from "@gooditworks/monitoring"

logger.info("monitoring initializated")
logger.error("cannot fetch orders", {userId: "cook"})
logger.captureException(new Error("something bad happen"))

const apiLogger = logger.module("api")
apiLogger.info("HTTP request", {method: "GET"})
```

Отправка данных во внешние сервисы (LogDNA/Sentry) происходит только при `NODE_ENV === production`.