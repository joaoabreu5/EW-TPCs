var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/', function(req, res) {
  Pessoa.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de pessoas."}))
});

router.get('/pessoas', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    Pessoa.list()
      .then(dados => res.status(200).json(dados))
      .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter a lista de pessoas."}))
  } else {
    Pessoa.getPessoasPorParam(req.query)
      .then(dados => res.status(200).json(dados))
      .catch(erro => res.status(522).json({erro: erro, mensagem: "Não consegui obter a lista de pessoas."}))
  }
})

router.get('/pessoas/:id', (req, res) => {
  Pessoa.getPessoa(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(523).json({erro: erro, mensagem: "Não consegui obter a pessoa."}))
})

router.post('/pessoas', (req, res) => {
  Pessoa.addPessoa(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(524).json({erro: erro, mensagem: "Não consegui inserir a pessoa."}))
})

router.post('/pessoas/lista', (req, res) => {
  Pessoa.addListaPessoas(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(525).json({erro: erro, mensagem: "Não consegui inserir a lista de pessoas."}))
})

router.put('/pessoas/:id', (req, res) => {
  Pessoa.updatePessoa(req.params.id, req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(526).json({erro: erro, mensagem: "Não consegui alterar a pessoa."}))
})

router.delete('/pessoas/:id', (req, res) => {
  Pessoa.deletePessoa(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(527).json({erro: erro, mensagem: "Não consegui apagar a pessoa."}))
})

module.exports = router;
