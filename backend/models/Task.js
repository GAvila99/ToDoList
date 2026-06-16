const mongoose = require('mongoose');

// modelo da tarefa
const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  concluida: {
    type: Boolean,
    default: false
  },
  criadaEm: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', tarefaSchema);

module.exports = Task;
