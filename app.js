const http = require('http')
const qs = require('querystring')
const printer = require('./printer')

const server = http.createServer(function(request, response) {
    console.dir(request.param)

    if (request.method == 'POST') {
        console.log('POST')
        var body = ''
        request.on('data', function(data) {
            body += data
        })

        request.on('end', function() {
            const post = qs.parse(body)
            const numbers = post.numbers
            const result = printer.print(numbers)
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.end('Result: ' + result)
        })
    } else {
        var html = `
            <form method="post" action="http://localhost:3001">Numbers: 
                        <input type="text" name="numbers" />
                        <input type="submit" name="Add" />
                    </form>`
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(html)
    }
})

const port = 3001
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
