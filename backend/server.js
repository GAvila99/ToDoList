require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tarefasRouter = require('./routes/tasks');

const app = express();

// precisava disso pra funcionar no celular
app.use(cors());
app.use(express.json());

// conectando no mongodb atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado no MongoDB!');
  })
  .catch((erro) => {
    console.log('Erro ao conectar no banco:', erro);
  });

app.use('/tarefas', tarefasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
