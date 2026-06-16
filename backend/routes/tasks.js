const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// buscar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tarefas = await Task.find();
    res.json(tarefas);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar tarefas' });
  }
});

// criar nova tarefa
router.post('/', async (req, res) => {
  try {
    const novaTarefa = new Task({
      titulo: req.body.titulo
    });
    const tarefaSalva = await novaTarefa.save();
    res.status(201).json(tarefaSalva);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao criar tarefa' });
  }
});

// atualizar tarefa (marcar como concluida)
router.put('/:id', (req, res) => {
  try {
    const tarefa = await Task.findByIdAndUpdate(
      req.params.id,
      { concluida: req.body.concluida },
      { new: true }
    );
    res.json(tarefa);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar tarefa' });
  }
});

// deletar tarefa
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Tarefa deletada com sucesso' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao deletar tarefa' });
  }
});

module.exports = router;
