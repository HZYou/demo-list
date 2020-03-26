const path = require('path')
const express = require('express')

const app = express()
const fs = require('fs')
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
    fs.readFile('./public/data/comment-data.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
            return
        }
        console.log(data)
        res.render('index.html', { postList: JSON.parse(data) })
    })

})
app.use('/public', express.static('./public'))

app.get('/post', (req, res) => {
    res.render('post.html')
})

app.get('/add', (req, res) => {
    fs.readFile('./public/data/comment-data.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
            return
        }
        const comment = req.query;
        comment.createTime = new Date().toISOString()
        data = JSON.parse(data)
        data.unshift(comment)
        fs.writeFile('./public/data/comment-data.json', JSON.stringify(data), (err) => {
            console.log(err)
            res.redirect('/')
        })

    })

})


app.listen(3000, () => console.log('Listening on http://localhost:3000'))