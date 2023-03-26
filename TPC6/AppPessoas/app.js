var express = require('express');
var logger = require('morgan');

var mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1/PessoasTPC6'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error...'))
db.on('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso...")
})

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;
