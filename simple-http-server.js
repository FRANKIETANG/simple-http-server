const http = require('http') // http 模块是一定的
const server = http.createServer()
server.listen(8282)
const querystring = require('querystring') // 引入 querystring 模块用来看 url 的 query

const users = []; // 做一个全局数组

server.on('request', (request, response) => { // 受到请求后调用一次
    // console.log(request.url)  // 这里会打印出 /，实际上是 url Path 后的东西，如果我在 loaclhost:8282 后面写上 show-me-something，后台就会返回 /show-me-something，再加点东西也是同理的
    const url = request.url

    const path = url.substr(0, url.indexOf('?'))

    const queryString = url.substr(url.indexOf('?') + 1, url.length)

    const query = querystring.parse(queryString)

    // console.log(query)
    // console.log(url)
    // console.log(path)

    // 做一个请求例子
    // 其他方法也是一样的
    switch (path) {
        case '/user':
            switch (request.method) {
                case 'GET':
                    response.statusCode = 200
                    response.end(JSON.stringify(users))
                    break;
                case 'POST':
                    const contentType = request.headers['content-type'] // 看请求头的属性

                    if (contentType !== 'application/json') { // 不是json就400
                        response.statusCode = 400
                        response.end('error')
                    }

                    let dataCount = 0
                    let requestBodyStr = ''
                    request.on('data', (data) => { // 当这个请求收到数据的时候
                        requestBodyStr += data.toString() // 把json变成字符串
                        // dataCount++
                        // console.log(data)
                    })
                    request.on('end', () => { // 当发过来的这个请求体已经结束的时候
                        const user = JSON.parse(requestBodyStr) // 解析josn字符串
                        users.push(user)
                        response.statusCode = 200
                        response.end(JSON.stringify(user))
                        // console.log(dataCount) // 看看一个文件要吃多少口
                        // response.end(dataCount + '')
                    })

                    // const user = { name: Math.floor(Math.random() * 100) }
                    // users.push(user)
                    // response.statusCode = 200
                    // response.end(JSON.stringify(user))
                    break
            }
            break
        default:
            response.statusCode = 404
            response.end('NOT_FOUND')
            break
    }

})