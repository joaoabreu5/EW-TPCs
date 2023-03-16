var http = require('http')
var axios = require('axios')
var pages = require('./pages')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions
function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation
var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if (static.staticResource(req)) {
        static.serveStaticResource(req, res)
    }
    else
    {
        switch(req.method)
        {
            case "GET": 
                if (req.url == "/") 
                {
                    Promise.all([
                        axios.get("http://localhost:3000/users?_sort=nome"),
                        axios.get("http://localhost:3000/tasks?_sort=date")
                    ])
                        .then(responses => {
                            var users = responses[0].data
                            var tasks = responses[1].data

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.initialPage(users, tasks, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista... Erro: " + erro)
                            res.end()
                        })
                }
                else if (req.url == '/users/add')
                {
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(pages.newUserPage())
                    res.end()
                }
                else if (/\/tasks\/[0-9]+$/i.test(req.url))
                {
                    id = req.url.substring(7)
                    axios.get("http://localhost:3000/tasks?id=" + id)
                        .then(response => {
                            var task = response.data[0]

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.recordInfoPage(task, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a tarefa... Erro: " + erro)
                            res.end()
                        })
                }
                else if (/\/tasks\/done\/[0-9]+$/i.test(req.url))
                {
                    id = req.url.substring(12)
                    axios.get("http://localhost:3000/tasks?id=" + id)
                    .then(response => {
                        var task = response.data[0]
                        task['done'] = true
                        axios.put("http://localhost:3000/tasks/" + id, task)
                            .then(resp => {
                                console.log(resp.data);
                                res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(pages.recordUpdatedPage(task, d))
                            })
                            .catch(error => {
                                console.log('Erro: ' + error);
                                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Unable to update record...</p>")
                                res.end()
                            });
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                        res.end()
                    })
                }
                else if (/\/tasks\/todo\/[0-9]+$/i.test(req.url))
                {
                    id = req.url.substring(12)
                    axios.get("http://localhost:3000/tasks?id=" + id)
                    .then(response => {
                        var task = response.data[0]
                        task['done'] = false
                        axios.put("http://localhost:3000/tasks/" + id, task)
                            .then(resp => {
                                console.log(resp.data);
                                res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(pages.recordUpdatedPage(task, d))
                            })
                            .catch(error => {
                                console.log('Erro: ' + error);
                                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Unable to update record...</p>")
                                res.end()
                            });
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                        res.end()
                    })
                }
                else if (/\/tasks\/edit\/[0-9]+$/i.test(req.url))
                {
                    id_tarefa = req.url.substring(12)
                    Promise.all([
                        axios.get("http://localhost:3000/users?_sort=nome"),
                        axios.get("http://localhost:3000/tasks?_sort=date"),
                        axios.get("http://localhost:3000/tasks?id=" + id_tarefa)
                    ])
                        .then(responses => {
                            var users = responses[0].data
                            var tasks = responses[1].data
                            var task = responses[2].data[0]

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(pages.editTaskPage(users, tasks, d, task))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista... Erro: " + erro)
                            res.end()
                        })
                }
                else if (/\/tasks\/delete\/[0-9]+$/i.test(req.url))
                {
                    id_tarefa = req.url.substring(14)
                    axios.get("http://localhost:3000/tasks?id=" + id_tarefa)
                        .then(response => {
                            var task = response.data[0]
                            axios.delete("http://localhost:3000/tasks/" + id_tarefa)
                                .then(() => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end(pages.recordDeletedPage(task, d))
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível apagar o registo... Erro: " + erro)
                                    res.end()
                                })
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível apagar o registo... Erro: " + erro)
                            res.end()
                        })
                }
                break

            case "POST":
                if(req.url == '/') {
                    collectRequestBodyData(req, result => {
                        if(result) 
                        {
                            result["done"] = false
                            axios.post('http://localhost:3000/tasks', result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(pages.recordInsertedPage(result, d))
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to insert record...</p>")
                                    res.end()
                                });
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if (req.url == '/users/add')
                {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post('http://localhost:3000/users', result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(pages.newUserAddedPage(result, d))
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to insert record...</p>")
                                    res.end()
                                });
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if (/\/tasks\/edit\/[0-9]+$/i.test(req.url))
                {
                    id = req.url.substring(12)
                    axios.get("http://localhost:3000/tasks?id=" + id)
                    .then(response => {
                        collectRequestBodyData(req, result => {
                            if (result) {
                                result["done"] = response.data[0]["done"]
                                axios.put('http://localhost:3000/tasks/' + id, result)
                                    .then(resp => {
                                        console.log(resp.data);
                                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.end(pages.recordUpdatedPage(result, d))
                                    })
                                    .catch(error => {
                                        console.log('Erro: ' + error);
                                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write("<p>Unable to insert record...</p>")
                                        res.end()
                                    });
                            }
                            else {
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to collect data from body...</p>")
                                res.end()
                            }
                        })
                    })
                    .catch(error => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Unable to get record... Error: " + error)
                        res.end()
                    })   
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
