const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

const ARQUIVO = './contatos.json';

function lerDados() {
  const dados = fs.readFileSync(ARQUIVO, 'utf-8');
  return JSON.parse(dados);
}

function salvarDados(dados) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2), 'utf-8');
}

// GET - listar contatos de um grupo
app.get('/contatos/:grupo', (req, res) => {
  const grupo = req.params.grupo;
  const dados = lerDados();

  if (!dados[grupo]) {
    return res.status(404).json({ error: 'Grupo não encontrado' });
  }

  res.json(dados[grupo]);
});

// POST - adicionar contato
app.post('/contatos/:grupo', (req, res) => {
  const grupo = req.params.grupo;
  const { nome, telefone } = req.body;
  const dados = lerDados();

  if (!dados[grupo]) {
    return res.status(404).json({ error: 'Grupo não encontrado' });
  }

  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }

  const novoContato = { nome, telefone };
  dados[grupo].push(novoContato);
  salvarDados(dados);

  res.status(201).json({
    message: 'Contato adicionado com sucesso!',
    contato: novoContato
  });
});

// PUT - atualizar contato por índice
app.put('/contatos/:grupo/:index', (req, res) => {
  const grupo = req.params.grupo;
  const index = parseInt(req.params.index, 10);
  const { nome, telefone } = req.body;

  const dados = lerDados();

  if (!dados[grupo]) {
    return res.status(404).json({ error: 'Grupo não encontrado' });
  }

  if (index < 0 || index >= dados[grupo].length) {
    return res.status(404).json({ error: 'Contato não encontrado' });
  }

  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }

  dados[grupo][index] = { nome, telefone };
  salvarDados(dados);

  res.json({
    message: 'Contato atualizado com sucesso!',
    contato: dados[grupo][index]
  });
});

// DELETE - remover contato por índice
app.delete('/contatos/:grupo/:index', (req, res) => {
  const grupo = req.params.grupo;
  const index = parseInt(req.params.index, 10);

  const dados = lerDados();

  if (!dados[grupo]) {
    return res.status(404).json({ error: 'Grupo não encontrado' });
  }

  if (index < 0 || index >= dados[grupo].length) {
    return res.status(404).json({ error: 'Contato não encontrado' });
  }

  const removido = dados[grupo].splice(index, 1);
  salvarDados(dados);

  res.json({
    message: 'Contato removido com sucesso!',
    contato: removido[0]
  });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});