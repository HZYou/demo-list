
const formidable = require('formidable')
const fs = require('fs')

function start(response) {
    var body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>node web服务应用</title>
        </head>
        <body>
            <form action="/upload" enctype="multipart/form-data" method="post">
                <input type="file" name="upload" multipart='multipart' />
                <input style="    display: block;
                    margin: 20px;
                    background: #00adff;
                    color: white;
                    border: none;
                    padding: 10px;" 
                    type="submit" value="Upload file" />
            </form>
        </body>
        </html>
    `
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(body)
    response.end()
}

function upload(response, request) {
    const form = new formidable.IncomingForm()
    form.uploadDir = 'public/tmp/'
    form.encoding = 'utf-8'
    form.keepExtensions = true  //保留后缀
    form.parse(request, (err, fields, files) => {
        if (err) {
            console.log(err)
            response.writeHead(500, { 'Content-Type': 'text/plain' })
            response.write(err + '\n')
            response.end()
            return
        }
        fs.renameSync(files.upload.path, form.uploadDir + 'test.png');
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('received image:<br />')
        response.write(`<img src='/show' />`) // 会请求show 的地址，进而执行下面的show 方法
        response.end()
    })
}

function show(response) {
    fs.readFile('public/tmp/test.png', 'binary', (err, file) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' })
            response.write(err + '\n')
            response.end()
            return
        }
        response.writeHead(200, { 'Content-Type': 'image/png' })
        response.write(file, 'binary')
        response.end()
    })
}

exports.start = start
exports.upload = upload
exports.show = show
