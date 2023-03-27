var express = require('express');
var router = express.Router();
var Exame = require('../controllers/emd')

/* GET home page. */
router.get('/', function(req, res) {
  Exame.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."}))
});

router.get('/emds/modalidades', (req, res) => {
  Exame.getModalidades()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(525).json({erro: erro, mensagem: "Não consegui a lista de modalidades."}))
})

router.get('/emds/aptos', (req, res) => {
  Exame.getNumeroAptos()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(526).json({erro: erro, mensagem: "Não consegui obter o número de atletas aptos."}))
})

router.get('/emds', (req, res) => {
  if (req.query.status === 'apto') {
    Exame.getNumeroAptos()
      .then(dados => res.status(200).json(dados))
      .catch(erro => res.status(527).json({erro: erro, mensagem: "Não consegui obter o número de atletas aptos."}))
  }
  else {
    res.status(404).json({mensagem: "Pedido não suportado."})
  }
})

router.get('/emds/atletas', (req, res) => {
  Exame.getAtletas()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(528).json({erro: erro, mensagem: "Não consegui obter a lista de atletas."}))
})

router.get('/emds/:id', (req, res) => {
  Exame.getExame(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame."}))
})

router.post('/emds', (req, res) => {
  Exame.addExame(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(522).json({erro: erro, mensagem: "Não consegui inserir o exame."}))
})

router.put('/emds/:id', (req, res) => {
  Exame.updateExame(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(523).json({erro: erro, mensagem: "Não consegui alterar o exame."}))
})

router.delete('/emds/:id', (req, res) => {
  Exame.deleteExame(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(524).json({erro: erro, mensagem: "Não consegui apagar o exame."}))
})

module.exports = router;
