# HTTP запросы и ответы
* это http сообщения, состоят из текстовой информации, записанной в несколько строк
* и запросы, и ответы имеют схожую структуру
  1. стартовая строка
  2. произвольный набор заголовков (headers)
  3. пустая строка (конец мета-информации)
  4. тело запроса (body)
* запросы и ответы отличаются стартовой строкой

## Запрос (REQUEST)
* стартовая строка
  - метод HTTP (GET, PUT, POST, ...)
  - цель запроса - URL
  - версия HTTP (HTTP/1.1, HTTP/2)
* `GET https://testimonialapi.toolcarton.com/api HTTP/2`
* `GET http://localhost:4444/api HTTP/1.1`
* `POST / HTTP 1.1`

## Ответ (RESPONSE)
* стартовая строка
  - версия HTTP (HTTP/1.1, HTTP/2)
  - статус код (200, 302, 404, 504)
  - пояснение (404 Not found, 200 OK, 504 Gateway time-out)
* `HTTP/1.1 200 OK`
* `HTTP/1.0 302 Found`
____________________________

## Подмена хоста
* /etc/hosts
* 127.0.0.1 somehost.dom
* порты по умолчанию:
  - http: 80
  - https: 443

## Генерация ключей для https
`openssl req -nodes -new -x509 -keyout server.key -out server.cert`
