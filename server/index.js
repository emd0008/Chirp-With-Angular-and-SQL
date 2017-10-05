var path = require("path");
let express = require('express');
let bodyParser = require("body-parser");
let mysql = require('mysql');
let app = express();

let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'chirpUser',
    password: 'chirpPassword',
    database: 'Chirps'
});

let clientDir = path.join(__dirname, "../client");

app.use(express.static(clientDir));
app.use(bodyParser.json());

app.route("/api/chirps")
    .get((req, res) => {
        rows('GetChirps')
        .then(function(chirps) {
            res.send(chirps);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
        })
    })
    .post((req, res) => {
        var newChirp = req.body;
        row('InsertChirp', [newChirp.message, newChirp.userid])
        .then(function(id){
            res.status(201).send(id);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
        });
    });

app.route("/api/chirps/:id")
    .get((req, res) => {
        row('GetChirp', [req.params.id])
        .then(function(chirp){
            res.send(chirp);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
        });
    }).put((req, res) => {
        empty('UpdateChirp', [req.params.id, req.body.message])
        .then(() => {
            res.sendStatus(204);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }).delete((req, res) => {
        empty('DeleteChirp', [req.params.id])
        .then(() => {
            res.sendStatus(204);
        }).catch((err) => {
            console.lof(err);
            res.sendStatus(500);
        });
    });

app.get('/api/users', function(req, res){
    rows('GetUsers').then(function(users){
        res.send(users);
    }).catch(function(err){
        console.log(err);
        res.sendStatus(500);
    });
});    

app.listen(3000);

function callProcedure(procedureName, args){
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection){
            if(err){
                reject(err);
            }else{
                var holder = '';
                if(args && args.length > 0) {
                    for(var i = 0; i < args.length; i++){
                        if(i === args.length - 1){
                            holder += '?';
                        }else{
                            holder += '?, ';
                        }
                    }
                }
                var callString = 'CALL ' + procedureName + '(' + holder + ');';
                connection.query(callString, args, function(err, resultsets){
                    connection.release();
                    if(err){
                        reject(err);
                    }else{
                        resolve(resultsets);
                    }
                });
            }        
        });
    });       
}

function rows(procedureName, args){
    return callProcedure(procedureName, args)
        .then(function(resultsets){
            return resultsets[0];
        });
}

function row(procedureName, args){
    return callProcedure(procedureName, args)
        .then(function(resultsets){
            return resultsets[0][0];
        });
}

function empty(procedureName, args){
    return callProcedure(procedureName, args)
        .then(() => {
            return;
        });
}