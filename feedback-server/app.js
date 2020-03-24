const http = require('http')
const fs = require('fs')
const url = require('url')

const template = require('art-template')

const postList = [{
    userName: '张三1',
    content: '今天☁️不值得不开心！',
    createTime: '2020-03-24'
}, {
    userName: '张三1',
    content: '今天☁️不值得不开心！',
    createTime: '2020-03-24'
}, {
    userName: '张三1',
    content: '今天☁️不值得不开心！',
    createTime: '2020-03-24'
}]

http.
    createServer((req, res) => {
        const parseObj = url.parse(req.url, true) //将请求路径解析成对象
        const pathname = parseObj.pathname;
        if (pathname === '/') {
            fs.readFile(__dirname + '/view/index.html', (err, file) => {
                if (err) {
                    console.log(err)
                    res.writeHead(500, { 'Content-type': 'text/plain' })
                    res.write(err + '<br />')
                    return res.end()
                }
                res.writeHead(200, { 'Content-Type': 'text/html' })
                const html = template.render(file.toString(), {
                    postList: postList
                })
                // res.write(html)
                res.end(html)
            })
        } else if (pathname.indexOf('/public') === 0) {
            fs.readFile('.' + req.url, (err, file) => {
                if (err) {
                    res.writeHead(500, { 'Content-type': 'text/plain' })
                    res.write(err + '<br />')
                    res.end()
                    return
                }
                res.writeHead(200)
                res.write(file)
                res.end()
            })

        } else if (pathname === '/post') {
            fs.readFile('./view/post.html', (err, file) => {
                if (err) {
                    res.writeHead(500)
                    res.write(err)
                    res.end()
                    return
                }
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(file)
                res.end()
            })
        } else if (pathname === '/add') {
            if (parseObj.query.userName && parseObj.query.content) {
                postList.push({
                    userName: parseObj.query.userName,
                    content: parseObj.query.content,
                    createTime: new Date().toISOString()
                })
                // 重定向
                res.statusCode = 302
                res.setHeader('Location', '/')
                res.end()
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            fs.readFile('./view/404.html', (err, file) => {
                if (err) {
                    res.writeHead(500)
                    res.write(err + '<br/>');
                    res.end()
                    return
                }
                res.write(file)
                res.end()

            })
        }
    }).listen(3000, () => console.log('Server is listening on: http://localhost:3000'))