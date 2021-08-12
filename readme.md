# Gooditworks Shared

Monorepo с общими (shared) пакетами Gooditworks.

## Использование

1. Завести [Github Personal Token](https://github.com/settings/tokens) с правами `read:packages` и `write:packages`
2. Записать его в локальную env переменную `NPM_TOKEN` (`export NPM_TOKEN=<token here..>`)
3. Если в проекте (который будет использовать shared библиотеку) ещё нет `.npmrc` создать его:

```
@gooditworks:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

4. При сборке проекта в CI (например Vercel) необходимо также добавить туда env переменную `NPM_TOKEN`

Инструкция, как обновлять и публиковать сами пакеты (shared библиотеки) находится в [docs/development.md](docs/development.md).

## Документация

- [Локальный запуск и разработка](docs/development.md)
- [Инфраструктура проекта](docs/infrastructure.md)
