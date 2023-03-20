var express = require('express');
var router = express.Router();
var Task = require('../controllers/task.js');
var User = require('../controllers/user.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  Promise.all([
    Task.list(),
    User.list()
  ])
    .then(lista => {
      res.render('index', {tasks: lista[0], users: lista[1]});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da(s) lista(s) de tarefas e/ou de utilizadores."})
    })
});


/* GET add user page. */
router.get('/users/add', function(req, res, next) {
    res.render('addUser')
});


/* GET task info page. */
router.get('/tasks/:idTask', function(req, res, next) {
  Task.getTask(req.params.idTask)
    .then(task => {
      res.render('taskInfo', {task: task});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da tarefa pedida."})
    })
});


/* GET task edit page. */
router.get('/tasks/edit/:idTask', function(req, res, next) {
  Promise.all([
    Task.list(),
    User.list(),
    Task.getTask(req.params.idTask)
  ])
    .then(lista => {
      res.render('taskEdit', {tasks: lista[0], users: lista[1], task_to_edit: lista[2]});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da(s) lista(s) de tarefas e/ou de utilizadores, ou na obtenção da tarefa pedida."})
    })
});


/* GET task 'done' confirm page. */
router.get('/tasks/done/:idTask', function(req, res, next) {
  Task.getTask(req.params.idTask)
    .then(task => {
      res.render('taskDone', {task: task});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na remoção da tarefa pedida."})
    })
});


/* GET task done. */
router.get('/tasks/done/:idTask/confirm', function(req, res, next) {
  var idTask = req.params.idTask
  
  Task.getTask(idTask)
    .then(task => {
      Task.editTask(idTask, task, true)
        .then(() => {
          res.redirect('/');
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro na edição do estado da tarefa pedida."})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da tarefa pedida."})
    })
});


/* GET task 'to do' confirm page. */
router.get('/tasks/todo/:idTask', function(req, res, next) {
  Task.getTask(req.params.idTask)
    .then(task => {
      res.render('taskToDo', {task: task});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na remoção da tarefa pedida."})
    })
});


/* GET task to do. */
router.get('/tasks/todo/:idTask/confirm', function(req, res, next) {
  var idTask = req.params.idTask
  
  Task.getTask(idTask)
    .then(task => {
      Task.editTask(idTask, task, false)
        .then(() => {
          res.redirect('/');
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro na edição do estado da tarefa pedida."})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da tarefa pedida."})
    })
});


/* GET Delete task page. */
router.get('/tasks/delete/:idTask', function(req, res, next) {
  Task.getTask(req.params.idTask)
    .then(task => {
      res.render('taskDelete', {task: task});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na remoção da tarefa pedida."})
    })
});


/* GET Delete task. */
router.get('/tasks/delete/:idTask/confirm', function(req, res, next) {
  Task.deleteTask(req.params.idTask)
    .then(() => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na remoção da tarefa pedida."})
    })
});


/* POST task. */
router.post('/tasks/add', function(req, res, next) {
  Task.addTask(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no registo da tarefa submetida."})
    })
});


/* POST user. */
router.post('/users/add', function(req, res, next) {
  User.addUser(req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no registo do utilizador submetido."})
    })
});


/* POST task edit. */
router.post('/tasks/edit/:idTask', function(req, res, next) {
  var idTask = req.params.idTask

  Task.getTask(idTask)
    .then(task => {
      Task.editTask(idTask, req.body, task.done)
        .then(() => {
          res.redirect('/');
        })
        .catch(erro => {
          res.render('error', {error: erro, message: "Erro na edição da tarefa pedida."})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da tarefa pedida."})
    })
});


module.exports = router;
