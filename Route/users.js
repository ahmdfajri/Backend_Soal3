var x = require('express').Router()
var bodyParser = require('body-parser')
var fs = require('fs')
var cors = require('cors')
var mysql = require('mysql');
var db = mysql.createConnection({
     host: 'localhost', 
     user: 'fajri', 
     password: '12345', 
     database: 'sekolahku' 
    });
db.connect();
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// dataJson = fs.readFileSync('./data.json', 'utf8')
// dataObj = JSON.parse(dataJson)

x.use(bodyParser.json())
x.use(cors())
x.post('/login', (req, res) => {
    if (req.query.username && req.query.password) {
        console.log(req.query.username)
        console.log(req.query.password)
        var sql = `SELECT * FROM users where username = ` + req.query.username + ` AND password =` + req.query.password;
        db.query(sql, (err, result) => {
            if (err) {
                console.log('masuk');
                response = [];
                response['login'] = 'failed';
                response['status'] = 'akun tidak terdaftar';
                res.send(response);
                throw err;
            }
            console.log('masuk if')
            console.log(result);
            res.send(result);
        });
    }
    else {
        response = { 'login': 'failed', 'status': 'password anda salah' };
        res.send(response);
    }
    console.log('masuk else')
});


// x.get('/login/:index', (req, res) => {
//     var i = req.params.index
//     if (i > 0 && i - 1 < dataObj.length) {
//         res.send(dataObj[req.params.index - 1])
//     } else {
//         res.send({ "status": "Maaf, data tidak tersedia" })
//     }
// })

x.post('/register', (req, res) => {
    // var pass = "";
    // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    //     // Store hash in your password DB.'
    //     pass = hash;
    // });
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };
    // let data = req.body
    var sql = 'INSERT INTO users SET ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Data sukses diinput!')
    });
});

module.exports = x