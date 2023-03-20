var axios = require('axios')

// Users list
module.exports.list = () => {
    return axios.get('http://localhost:3000/users?_sort=name')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

// Add user
module.exports.addUser = user => {
    return axios.post('http://localhost:3000/users', user)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
