# Просмотр директорий из консоли

* текущая рабочая директория (current working dir = CWD)
* перемещение по директориям: `cd`
  - переход в другую папку в текущей директории: `cd some-dirname`
  - вызод из папки на уровень выше: `cd ..`
  - переход в домашнюю директорию `cd ~`
  - переход в предыдущую директорию (unix) `cd -`
* просмотр содержимого директории: `ls`
  - просмотр указанной директории `ls some-dirname`
  - подробный просмотр (unix) `ls -l`
  - просмотр всех файлов (включая скрытые, unix) `ls -a`
  - подробный просмотр всех файлов (unix) `ls -la`

### Домашнее задание
* реализуйте что бы команда `ls` могла принимать параметр с именем директории
  список файлов которой необходимо вывести
