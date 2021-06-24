# @gooditworks/monitoring

Утилита для мониторинга приложений, включающая в себя:

- Логгер с поддержкой нескольких уровней логгирования, отправкой логов в LogDNA и исключений в Sentry
- Аналитику с отправкой в Google Analytics (только в браузерном окружении)

## Использование

Установить пакет `@gooditworks/monitoring` стандартными средствами (см. [использование shared библиотек](readme.md#Использование))

```
npm i @gooditworks/monitoring
```

### Инициализация

Пакет должен быть инициализирован перед использованием. Для этого он экспортирует 2 разные функции инициализации, для браузера и окружения Node.

#### Браузер

```typescript
import init from "@gooditworks/monitoring/init-browser"

init({
  logger: {
    logdnaAppName: "giw_website",
    logdnaIngestionKey: "12345678abcdef",
    sentryDsn: "https://public@sentry.example.com/1"
  },
  analytics: {
    measurementId: "G-12345678"
  }
})
```

#### Node

```typescript
import init from "@gooditworks/monitoring/init-node"

init({
  logger: {
    logdnaAppName: "giw_website",
    logdnaIngestionKey: "12345678abcdef",
    sentryDsn: "https://public@sentry.example.com/1"
  }
})
```

После инициализации пакет можно использовать в любом месте приложения

```typescript
import {logger, analytics} from "@gooditworks/monitoring"

logger.info("monitoring initializated")
logger.error("cannot fetch orders", {userId: "cook"})
logger.captureException(new Error("something bad happen"))

analytics.event("button_click", {theme: "Dark"})
```
