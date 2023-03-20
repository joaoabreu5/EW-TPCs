var axios = require('axios')

// Tasks list
module.exports.list = () => {
    return axios.get('http://localhost:3000/tasks?_sort=date')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

// Add task
module.exports.addTask = task => {
    task['done'] = false
    return axios.post('http://localhost:3000/tasks', task)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

// Get task
module.exports.getTask = id => {
    return axios.get('http://localhost:3000/tasks/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

// Edit task
module.exports.editTask = (id, task, done) => {
    task['done'] = done
    return axios.put('http://localhost:3000/tasks/' + id, task)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

// Get task
module.exports.deleteTask = id => {
    return axios.delete('http://localhost:3000/tasks/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
