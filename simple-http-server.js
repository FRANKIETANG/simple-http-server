const http = require('http') // http 模块是一定的
const server = http.createServer()
server.listen(8282)

server.on('request', (request, response) => { // 受到请求后调用一次
    // console.log(request.url)  // 这里会打印出 /，实际上是 url Path 后的东西，如果我在 loaclhost:8282 后面写上 show-me-something，后台就会返回 /show-me-something，再加点东西也是同理的
    const url = request.url

    console.log(url)

    let responseStr // 定义返回字符串，收到 url 做出不同的返回值

    if (url === '/hello') { // 记得加前缀 /
        responseStr = 'hi there'
    } else if (url === '/bye') {
        responseStr = 'see ya next time'
    } else {
        responseStr = 'i cant understand what you are saying'
    }

    response.statusCode = 200
    response.end(responseStr)
    // response.end('this is my first http server')
})