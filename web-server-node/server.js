const http = require('http')
// const url = require('url')

function start(route, handle) {
    const server = http.createServer()
    server.on('request', (req, res) => {
        route(handle, req.url, res, req)
        // console.log(req)
        // const pathname = url.parse(req.url).pathname
        // res.writeHead(200, { 'Content-Type': 'text/plain' })
        // res.write('Hello World !')
        // res.end()
    })

    server.listen(3000, () => {
        console.log('Server listening on http://localhost:3000')
    })
}

exports.start = start;

