const path = require('path')
const express = require('express')

const app = express()

app.engine('html', require('express-art-template'));

app.set('views', path.join(__dirname, 'view'));


const postList = [
    {
        userName: '张三1',
        content: '今天☁️不值得不开心！',
        createTime: '2020-03-24'
    }, {
        userName: '张三1',
        content: '今天☁️不值得不开心！',
        createTime: '2020-03-24'
    }
]

app.get('/', (req, res) => {
    res.render('index.html', { postList })
})
app.use('/public', express.static('./public'))

app.get('/post', (req, res) => {
    res.render('post.html')
})

app.get('/add', (req, res) => {
    const comment = req.query;
    comment.createTime = new Date().toISOString()
    postList.unshift(comment)
    res.redirect('/')
})


app.listen(3000, () => console.log('Listening on http://localhost:3000'))