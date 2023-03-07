var http = require('http');
var axios = require('axios');
var mypages = require('./mypages');
var fs = require('fs');

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0,16);
    console.log(req.method + " " + req.url + " " + d)

    if (req.url == '/' || req.url == '/pessoas' || req.url == '/pessoas/') {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp) {
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.genMainPage(pessoas, d, "Lista de pessoas"));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url == '/pessoasOrdenadas' || req.url == '/pessoasOrdenadas/') {
        axios.get('http://localhost:3000/pessoas?_sort=nome')
            .then(function(resp) {
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.genMainPage(pessoas, d, "Lista de pessoas ordenada"));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url == '/sexo' || req.url == '/sexo/') {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp) {
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.genGenderPage(pessoas, d));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url == '/desportos' || req.url == '/desportos/') {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp) {
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.genSportsPage(pessoas, d));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url == '/top10Profissoes' || req.url == '/top10Profissoes/') {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp) {
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.genTop10JobsPage(pessoas, d));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url.match(/w3\.css$/)) {
        fs.readFile("w3.css", function(erro, dados) {
            if (erro) {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>');
            }
            else {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(dados);
            }
        })
    }
    else if (req.url.match(/\/pessoas\/p\d+/)) {
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp) {
                var pessoa = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.genPersonPage(pessoa, d));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url.match(/\/sexo\/[a-zA-z]+/)) {
        var sexo = decodeURIComponent(req.url).substring(6)
        axios.get('http://localhost:3000/pessoas?sexo=' + sexo)
            .then(function(resp) {
                var pessoa = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.genMainPage(pessoa, d, "Lista de pessoas do sexo '" + sexo + "'"));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url.match(/\/desportos\/[a-zA-z]+/)) {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp) {
                var pessoa = resp.data
                var desporto = decodeURIComponent(req.url).substring(11)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.genPeopleList_SportPage(pessoa, desporto, d));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else if (req.url.match(/\/profissao\/[a-zA-z]+/)) {
        var profissao = decodeURIComponent(req.url).substring(11)
        axios.get('http://localhost:3000/pessoas?profissao=' + profissao)
            .then(function(resp) {
                var pessoa = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.genMainPage(pessoa, d, "Lista de pessoas com a profissão '" + profissao + "'"));
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>');
            })
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('<p>Operação não suportada: ' + req.url + '</p>');
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");
