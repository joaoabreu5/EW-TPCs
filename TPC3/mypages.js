// mypages.js
// 03.03.2023 por João Abreu
// HTML templates generating functions

exports.genMainPage = function(lista, data, titulo_pag) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css">
            <style>
                .w3-bar {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    height: 35px;
                    display: flex;
                    align-items: center;
                }
                body {
                    padding-top: 35px;
                }
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                }
            </style>

            <script>
                window.addEventListener("load", function() {
                    if (document.body.scrollHeight > window.innerHeight) 
                    {
                        document.querySelector("footer").style.position = "static";
                    } 
                });
            </script>
        </head>

        <body>
            <div class="w3-bar w3-black">
                <a href="/pessoas" class="w3-bar-item w3-button">Lista de pessoas</a>
                <a href="/pessoasOrdenadas" class="w3-bar-item w3-button">Lista de pessoas ordenada</a>
                <a href="/sexo" class="w3-bar-item w3-button">Distribuição por sexo</a>
                <a href="/desportos" class="w3-bar-item w3-button">Distribuição por desporto</a>
                <a href="/top10Profissoes" class="w3-bar-item w3-button">Top 10 de profissões</a>
            </div>

            <div class="w3-card-2">
                <header class="w3-container w3-green">
                    <h1>${titulo_pag}</h1>
                </header>

                <div class="container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                        </tr>
    `

    for (let i=0; i<lista.length; i++)
    {
        pagHTML += `
        <tr>
            <td>${lista[i].id}</td>
            <td>
                <a href="/pessoas/${lista[i].id}">${lista[i].nome}</a>
            </td>
            <td>${lista[i].idade}</td>
            <td>${lista[i].sexo}</td>
            <td>${lista[i].morada.cidade}</td>
        </tr>
        `
    }
    
    pagHTML += `</table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>    
    `

    return pagHTML;
}

exports.genPersonPage = function(p, d) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css">
            <style>
                .w3-bar {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    height: 35px;
                    display: flex;
                    align-items: center;
                }
                body {
                    padding-top: 35px;
                }
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                }
            </style>

            <script>
                window.addEventListener("load", function() {
                    if (document.body.scrollHeight > window.innerHeight) 
                    {
                        document.querySelector("footer").style.position = "static";
                    } 
                });
            </script>
        </head>

        <body>
            <div class="w3-bar w3-black">
                <a href="/pessoas" class="w3-bar-item w3-button">Lista de pessoas</a>
                <a href="/pessoasOrdenadas" class="w3-bar-item w3-button">Lista de pessoas ordenada</a>
                <a href="/sexo" class="w3-bar-item w3-button">Distribuição por sexo</a>
                <a href="/desportos" class="w3-bar-item w3-button">Distribuição por desporto</a>
                <a href="/top10Profissoes" class="w3-bar-item w3-button">Top 10 de profissões</a>
            </div>

            <div class="w3-card-2">
                <header class="w3-container w3-green">
                    <h1>${p.nome}</h1>
                </header>
                <div class="container">
                    <table class="w3-table-all">
                    `

    for (key in p) 
    {
        value = p[key]
        pagHTML += `<tr>
                        <td>
                            <ul class="w3-ul">
                                <li>
                                    <b>${key}</b>
                                </li>
                            </ul>
                        </td>
                    `

        if (Array.isArray(value))
        {
            if (value.length > 0)
            {
                pagHTML += `<td>
                                <ul class="w3-ul">
                            `
                for (index in value) 
                {   
                    pagHTML += `    <li>${value[index]}</li>`   
                }
                pagHTML += `    </ul>
                            </td>
                            `
            }    
        }
        else if (typeof value === 'object')
        {
            if (Object.keys(value).length > 0)
            {
                pagHTML += `<td>
                                <ul class="w3-ul">
                            `
                for (key2 in value) 
                {   
                    pagHTML += `    <li>
                                        <b>${key2}</b>: ${value[key2]}
                                    </li>`   
                }
                pagHTML += `    </ul>
                            </td>
                            `
            }
        }
        else
        {
            pagHTML += `<td>
                            <ul class="w3-ul">
                                <li>${value}</li>
                            </ul>
                        </td>
                        `
        }
        pagHTML += `</tr>`
    }
                   
    pagHTML += `    </table>
                </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>    
    `

    return pagHTML;
}

exports.genGenderPage = function(pessoas, data) {
    var dict_sexo = {};

    for (let i=0; i<pessoas.length; i++) 
    {
        if (pessoas[i].sexo in dict_sexo) {
            dict_sexo[pessoas[i].sexo]++;
        }
        else {
            dict_sexo[pessoas[i].sexo] = 1;
        }
    }

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About Gender...</title>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css">
            <style>
                .w3-bar {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    height: 35px;
                    display: flex;
                    align-items: center;
                }
                body {
                    padding-top: 35px;
                }
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                }
            </style>

            <script>
                window.addEventListener("load", function() {
                    if (document.body.scrollHeight > window.innerHeight) 
                    {
                        document.querySelector("footer").style.position = "static";
                    } 
                });
            </script>
        </head>

        <body>
            <div class="w3-bar w3-black">
                <a href="/pessoas" class="w3-bar-item w3-button">Lista de pessoas</a>
                <a href="/pessoasOrdenadas" class="w3-bar-item w3-button">Lista de pessoas ordenada</a>
                <a href="/sexo" class="w3-bar-item w3-button">Distribuição por sexo</a>
                <a href="/desportos" class="w3-bar-item w3-button">Distribuição por desporto</a>
                <a href="/top10Profissoes" class="w3-bar-item w3-button">Top 10 de profissões</a>
            </div>

            <div class="w3-card-2">
                <header class="w3-container w3-green">
                    <h1>Distribuição por sexo</h1>
                </header>
                <div class="container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Sexo</th>
                            <th>Frequência</th>
                        </tr>
                    `

    const sortedKeys = Object.keys(dict_sexo).sort(function(a, b) {
        return dict_sexo[b] - dict_sexo[a];
    });

    sortedKeys.forEach(function(sexo) {
        pagHTML += `
        <tr>
            <td>${sexo}</td>
            <td>
                <a href="/sexo/${sexo}">${dict_sexo[sexo]}</a>
            </td>
        </tr>
        `
    });

    pagHTML += `
                    </table>
                </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>    
    `

    return pagHTML;
}

exports.genSportsPage = function(pessoas, data) {
    var dict_desportos = {};

    for (let i=0; i<pessoas.length; i++) 
    {
        for (let j=0; j<pessoas[i].desportos.length; j++)
        {
            if (pessoas[i].desportos[j] in dict_desportos) {
                dict_desportos[pessoas[i].desportos[j]]++;
            }
            else {
                dict_desportos[pessoas[i].desportos[j]] = 1;
            }

        }
    }

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About Sports...</title>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css">
            <style>
                .w3-bar {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    height: 35px;
                    display: flex;
                    align-items: center;
                }
                body {
                    padding-top: 35px;
                }
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                }
            </style>

            <script>
                window.addEventListener("load", function() {
                    if (document.body.scrollHeight > window.innerHeight) 
                    {
                        document.querySelector("footer").style.position = "static";
                    } 
                });
            </script>
        </head>

        <body>
            <div class="w3-bar w3-black">
                <a href="/pessoas" class="w3-bar-item w3-button">Lista de pessoas</a>
                <a href="/pessoasOrdenadas" class="w3-bar-item w3-button">Lista de pessoas ordenada</a>
                <a href="/sexo" class="w3-bar-item w3-button">Distribuição por sexo</a>
                <a href="/desportos" class="w3-bar-item w3-button">Distribuição por desporto</a>
                <a href="/top10Profissoes" class="w3-bar-item w3-button">Top 10 de profissões</a>
            </div>

            <div class="w3-card-2">
                <header class="w3-container w3-green">
                    <h1>Distribuição por desporto</h1>
                </header>
                <div class="container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Desporto</th>
                            <th>Frequência</th>
                        </tr>
                    `

    const sortedKeys = Object.keys(dict_desportos).sort(function(a, b) {
        return dict_desportos[b] - dict_desportos[a];
    });

    sortedKeys.forEach(function(desporto) {
        pagHTML += `
        <tr>
            <td>${desporto}</td>
            <td>
                <a href="/desportos/${desporto}">${dict_desportos[desporto]}</a>
            </td>
        </tr>
        `
    });

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>    
    `

    return pagHTML;
}

exports.genPeopleList_SportPage = function(lista, desporto, data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css">
            <style>
                .w3-bar {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    height: 35px;
                    display: flex;
                    align-items: center;
                }
                body {
                    padding-top: 35px;
                }
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                }
            </style>

            <script>
                window.addEventListener("load", function() {
                    if (document.body.scrollHeight > window.innerHeight) 
                    {
                        document.querySelector("footer").style.position = "static";
                    } 
                });
            </script>
        </head>

        <body>
            <div class="w3-bar w3-black">
                <a href="/pessoas" class="w3-bar-item w3-button">Lista de pessoas</a>
                <a href="/pessoasOrdenadas" class="w3-bar-item w3-button">Lista de pessoas ordenada</a>
                <a href="/sexo" class="w3-bar-item w3-button">Distribuição por sexo</a>
                <a href="/desportos" class="w3-bar-item w3-button">Distribuição por desporto</a>
                <a href="/top10Profissoes" class="w3-bar-item w3-button">Top 10 de profissões</a>
            </div>

            <div class="w3-card-2">
                <header class="w3-container w3-green">
                    <h1>Lista de pessoas praticantes de '${desporto}'</h1>
                </header>

                <div class="container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                        </tr>
    `

    for (let i=0; i<lista.length; i++)
    {
        if (lista[i].desportos.includes(desporto))
        {
            pagHTML += `
            <tr>
                <td>${lista[i].id}</td>
                <td>
                    <a href="/pessoas/${lista[i].id}">${lista[i].nome}</a>
                </td>
                <td>${lista[i].idade}</td>
                <td>${lista[i].sexo}</td>
                <td>${lista[i].morada.cidade}</td>
            </tr>
            `
        }
    }
    
    pagHTML += `
        </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>    
    `

    return pagHTML;
}

exports.genTop10JobsPage = function(pessoas, data) {
    var dict_profissao = {};

    for (let i=0; i<pessoas.length; i++) 
    {
        if (pessoas[i].profissao in dict_profissao) {
            dict_profissao[pessoas[i].profissao]++;
        }
        else {
            dict_profissao[pessoas[i].profissao] = 1;
        }
    }

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Top 10 Jobs</title>
            <link rel="stylesheet" type="text/css" href="/stylesheets/w3.css">
            <style>
                .w3-bar {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    height: 35px;
                    display: flex;
                    align-items: center;
                }
                body {
                    padding-top: 35px;
                }
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                }
            </style>

            <script>
                window.addEventListener("load", function() {
                    if (document.body.scrollHeight > window.innerHeight) 
                    {
                        document.querySelector("footer").style.position = "static";
                    } 
                });
            </script>
        </head>

        <body>
            <div class="w3-bar w3-black">
                <a href="/pessoas" class="w3-bar-item w3-button">Lista de pessoas</a>
                <a href="/pessoasOrdenadas" class="w3-bar-item w3-button">Lista de pessoas ordenada</a>
                <a href="/sexo" class="w3-bar-item w3-button">Distribuição por sexo</a>
                <a href="/desportos" class="w3-bar-item w3-button">Distribuição por desporto</a>
                <a href="/top10Profissoes" class="w3-bar-item w3-button">Top 10 de profissões</a>
            </div>

            <div class="w3-card-2">
                <header class="w3-container w3-green">
                    <h1>Top 10 de profissões</h1>
                </header>
                <div class="container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Pos.</th>
                            <th>Profissão</th>
                            <th>Frequência</th>
                        </tr>
                    `

    const sortedKeys = Object.keys(dict_profissao).sort(function(a, b) {
        return dict_profissao[b] - dict_profissao[a];
    });

    if (sortedKeys.length > 0)
    {
        pos = 1
        ref_value = dict_profissao[sortedKeys[0]]

        for (let i = 0; pos<=10 && i<sortedKeys.length; i++)
        {
            profissao = sortedKeys[i]
            freq = dict_profissao[profissao]

            if (freq < ref_value)
            {
                pos = i+1;
                ref_value = freq
            }

            if (pos <= 10)
            {
                pagHTML += `
                <tr>
                    <td>${pos}</td>
                    <td>${profissao}</td>
                    <td>
                        <a href="/profissao/${profissao}">${dict_profissao[profissao]}</a>
                    </td>
                </tr>
                `
            }
        }
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>    
    `

    return pagHTML;
}
