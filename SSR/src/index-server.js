// 服务端渲染
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { StaticRouter as Router } from 'react-router-dom';
import express from 'express';

const htmlTemplate = inner => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SSR服务端渲染</title>
</head>

<body>
    <div id='root'>${inner}</div>
    <noscript>
        你需要加载 Javascript 才能启动应用
    </noscript>
    <script src='/bundle.js'></script>
</body>

</html>
`.trim();

const app = express();
app.use(express.static(__dirname));
app.get('*', (req, res) => {
    const appHtml = renderToString(<Router localhost={req.url}><App /></Router>);
    const html = htmlTemplate(appHtml);
    res.send(html);
});

app.listen(2048, () => console.log('server is ready:http://localhost:2048'));