const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/') {
        res.write(html);
        res.end();
    }
});

server.listen('3000', () => {
    console.log('Server is ok, url:http://localhost:3000');
});

const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node 服务器</title>
</head>

<body>
    <div id='root'>这是 node 启动的服务</div>
</body>

</html>
`