var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2] || process.env.PORT

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  const {pathname: path, searchParams: query, search} =
    new url.URL(request.url, `http://localhost:${port}`)
  const {method} = request

  /******** 从这里开始看，上面不要看 ************/
  // 请确保你的 Node.js 的版本号 >= 14

  console.log('------------------')
  console.log('有个傻子发请求过来啦！')
  console.log('路径为：' + path)
  console.log('查询参数为：' + search)

  if (path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="./style.css">
      </head>
      <body>
        <h1>Hello World!</h1>
      </body>
      </html>
    `)
    response.end()
  } else if (path === '/style') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`h1{color: red;}`)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你访问的页面不存在`)
    response.end()
  }

  console.log('请求处理完毕\n')
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
