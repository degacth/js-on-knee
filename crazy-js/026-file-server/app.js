const http = require('http')
const fs = require('fs')
const fsAsync = require('fs/promises')
const events = require('events')
const path = require('path')
const port = 4444
const host = '0.0.0.0'

const dirTemplate = _ => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Files server: ${_.title}</title>
</head>
<body>
  <ul>
    <li><a href="..">..</a></li>
    ${_.files.map(f =>
  `<li><a href="${f}">${f}</a></li>`
  ).join('')}
  </ul>
</body>
</html>
`
const isDir = async filePath => (await fsAsync.stat(filePath)).isDirectory()
const suffixDirWithSlash = async (basePath, fileName) =>
  fileName + ( await isDir(path.join(basePath, fileName)) ? '/' : '' )

const createDirectoryHTML = async dirPath => {
  const files = await Promise.all(
    (await fsAsync.readdir(dirPath))
      .map(fileName => suffixDirWithSlash(dirPath, fileName))
  )
  return dirTemplate({ title: dirPath, files })
}

const handleRequest = async (request, response) => {
  const currentPath = path.join(process.cwd(), decodeURIComponent(request.url))
  if (await isDir(currentPath)) return response.end(await createDirectoryHTML(currentPath))

  response.setHeader('content-type', 'application/octet-stream')
  const file = fs.createReadStream(currentPath)
  await events.once(file, 'open')
  file.pipe(response)
}

const tryRequest = callback => async (request, response) => {
  console.log(`Handle ${request.url}`)
  try {
    await callback(request, response)
  }
  catch (e) {
    response.setHeader('content-type', 'text/plain; charset=urf-8')
    response.end(`Error: ${e.message}`)
    console.error(e)
  }
}

http.createServer(tryRequest(handleRequest)).listen(port, host)
console.log(`Server listen ${host}:${port}`)
