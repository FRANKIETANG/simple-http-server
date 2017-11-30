const http = require('http') // http 模块是一定的
const server = http.createServer()
server.listen(8282)
const querystring = require('querystring') // 引入 querystring 模块用来看 url 的 query

server.on('request', (request, response) => { // 受到请求后调用一次
    // console.log(request.url)  // 这里会打印出 /，实际上是 url Path 后的东西，如果我在 loaclhost:8282 后面写上 show-me-something，后台就会返回 /show-me-something，再加点东西也是同理的
    const url = request.url

    const queryString = url.substr(url.indexOf('?') + 1, url.length)

    const query = querystring.parse(queryString)

    console.log(query)

    // console.log(url)

    let responseStr // 定义返回字符串，收到 url 做出不同的返回值

    if (url.indexOf('/hello') > -1) { // 记得加前缀 /
        responseStr = 'hi there'
        if (query.i_need_money === 'true' && Number(query.how_much) > 500) {  // 这里做一个判断他是不是要钱，值得一提的是这里这个 'true'，因为这里是没有类型的所以要用这个 'true'
            responseStr = 'go away'
        } else {
            responseStr = 'ok, here you are'
        }
    } else if (url.indexOf('/bye') > -1) {  // 也可以用正则，不过如果写不好就会比 indexOf 要慢很多很多...
        responseStr = 'see ya next time'
    } else {
        responseStr = 'i cant understand what you are saying'
    }

    response.statusCode = 200
    response.end(responseStr)
    // response.end('this is my first http server')
})