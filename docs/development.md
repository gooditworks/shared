# Локальный запуск и разработка

Пакeты (библиотеки) находятся в папке [packages](/packages). Каждый пакет имеет свой `package.json` и `tsconfig.json`. При этом eslint и jest общие на все пакеты.

## Публикация/обновление пакета

1. Выполнить 1 и 2 пункт из [readme](readme.md#Использование)
2. Обновить версию пакета, согласно [semver](https://semver.org)
3. Собрать пакет (`npm run build`)
4. Опубликовать его (`npm publish`)