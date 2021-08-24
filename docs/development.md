# Локальный запуск и разработка

Пакeты (библиотеки) находятся в папке [packages](/packages). Каждый пакет имеет свой `package.json` и `tsconfig.json`. При этом eslint и jest общие на все пакеты.

## Публикация/обновление пакета

1. Выполнить 1 и 2 пункт из [readme](readme.md#Использование)
2. Закоммитить изменения согласно (Conventional commits)[https://www.conventionalcommits.org]
3. Проверить код: `npm run lint && npm run test`
4. Не бампая версию вручную, запустить `standard-version`: `npm run release`
5. Запушить созданный changelog: `git push`
6. Собрать пакет (`npm run build`)
7. Опубликовать его (`npm publish`)
