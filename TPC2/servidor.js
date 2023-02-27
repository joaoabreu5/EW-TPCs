var http = require('http');
var url = require('url');
var fs = require('fs');

var myServer = http.createServer(function (req, res) {
    console.log(req.method + " " + req.url);

    var pedido = url.parse(req.url, true).pathname
    var folder_path = 'cidades'

    if (pedido == '/' || pedido == '/indice') 
    {
        path = 'index.html'
    }
    else 
    {
        path = folder_path + pedido + '.html'
    }

    fs.readFile(path, function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        if (err) {
            res.write("ERRO: na leitura do ficheiro :: " + err);
        }
        else {
            res.write(data);
        }
        res.end();
    });
});

myServer.listen(7777);
console.log("Servidor à escuta na porta 7777...");
