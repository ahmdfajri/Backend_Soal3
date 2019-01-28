var express = require('express')
var app = express()
var myroute = require('./Route/users')



app.use(myroute)
// app.use('/files', express.static('gambar'))


app.get('/', (req, res)=>{
    res.send({"status": "Server aktif!"})
})


app.use((req, res)=>{
    res.status(404).send({"status":"404 not found"})
})


app.listen(1234, ()=>{
    console.log('Server sudah aktif di port 1234')
})