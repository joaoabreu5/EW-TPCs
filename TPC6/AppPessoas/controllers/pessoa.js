var Pessoa = require('../models/pessoa')

// Pessoas list
module.exports.list = () => {
    return Pessoa
            .find()
            .sort({nome:1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getPessoa = id => {
    return Pessoa.findById(id)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getPessoasPorParam = obj => {
    return Pessoa.find(obj)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addPessoa = p => {
    return Pessoa.create(p)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addListaPessoas = lista => {
    return Pessoa.insertMany(lista)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updatePessoa = (id, p) => {
    return Pessoa.updateOne({_id: id}, p)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deletePessoa = id => {
    return Pessoa.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}
