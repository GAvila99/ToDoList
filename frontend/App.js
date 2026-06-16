import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

// ip hardcoded - mudar se mudar de rede
const API_URL = 'http://192.168.1.100:3000';

export default function App() {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = async () => {
    try {
      const resposta = await fetch(API_URL + '/tarefas');
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      console.log('Erro ao buscar tarefas:', erro);
    }
  };

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === '') return;
    try {
      const resposta = await fetch(API_URL + '/tarefas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo: novaTarefa })
      });
      const tarefaCriada = await resposta.json();
      setTarefas([...tarefas, tarefaCriada]);
      setNovaTarefa('');
    } catch (erro) {
      console.log('Erro ao adicionar tarefa:', erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemTarefa}>
            <Text>{item.titulo}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10
  },
  botaoAdicionar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },
  itemTarefa: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});
