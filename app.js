const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const port = 3100
const dbConfiq = require('./config/DbConfig')
const cors = require('cors')
const path = require('path')

mongoose.connect(dbConfiq.mongoURL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("connect mongodb"))
  .catch(err => console.log(err))

app.use(cors())

app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use('/gambar', express.static(path.join(__dirname, 'gambar')))
app.use('/user', require('./routes/User'))
app.use('/motor', require('./routes/Motor'))

app.listen(port, function () {
    console.log('Server berjalan di port' + port)
})