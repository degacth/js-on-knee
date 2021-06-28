# Полноценный node.js проект

## Для создания проекта
* `npm init`
  - генерирует файл **package.json**
  - `-y` задаёт значения по уполчанию
* `npm install some-package-name` || `npm i some-package-name`
  - создаёт папку **node_modules**
  - загружает сторонние библиотеки в **node_modules**
  - `-S` || `--save` делает запись в файл **package.json** в свойство "dependencies" имя зависимости
  - `-D` || `--save-dev` тоже что и параметр `-S`, только запись делается в свойство "devDependencies"
  - `-g` || `--global` устанавливает библиотеку в глобальную область `npm root -g`
* `npm link` создаёт ссылку для запуска исполняемого файла:
  - **#!/usr/bin/env node** - **shebang** только для unix
  - `chmod +x app.js` - сделать файл исполняемым
  - **"bin": { "command-name": "./app.js" }**
* для установки всех зависимостей из файла **package.json** используйте комманду `npm i`
