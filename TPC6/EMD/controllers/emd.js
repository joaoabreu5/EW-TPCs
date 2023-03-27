var Exame = require('../models/emd')

// Exames list
module.exports.list = () => {
    return Exame
            .find()
            .sort({dataEMD:-1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getExame = id => {
    return Exame.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addExame = e => {
    return Exame.create(e)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateExame = e => {
    return Exame.updateOne({_id:e._id}, e)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteExame = id => {
    return Exame.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getModalidades = () => {
    return Exame
            .distinct('modalidade')
            .sort()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getNumeroAptos = () => {
    return Exame
            .count({resultado: true})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getAtletas = () => {
    return Exame
            .distinct('nome')
            .sort()
            .then(resposta => {
                return resposta.map(pessoa => `${pessoa.primeiro} ${pessoa.último}`);
            })
            .catch(erro => {
                return erro
            })
}
