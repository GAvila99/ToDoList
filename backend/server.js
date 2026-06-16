require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// conectando no mongodb atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado no MongoDB!');
  })
  .catch((erro) => {
    console.log('Erro ao conectar no banco:', erro);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
