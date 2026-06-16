import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';

// MUDA AQUI SE TROCAR DE REDE
const API_URL = 'http://192.168.1.100:3000';

export default function App() {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

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
    } finally {
      setCarregando(false);
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

  const deletarTarefa = async (id) => {
    try {
      await fetch(API_URL + '/tarefas/' + id, {
        method: 'DELETE'
      });
      const novaLista = tarefas.filter((t) => t._id !== id);
      setTarefas(novaLista);
    } catch (erro) {
      console.log('Erro ao deletar:', erro);
    }
  };

  const alternarConcluida = async (tarefa) => {
    try {
      const resposta = await fetch(API_URL + '/tarefas/' + tarefa._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ concluida: !tarefa.concluida })
      });
      const tarefaAtualizada = await resposta.json();
      const novaLista = tarefas.map((t) =>
        t._id === tarefa._id ? tarefaAtualizada : t
      );
      setTarefas(novaLista);
    } catch (erro) {
      console.log('Erro ao atualizar:', erro);
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

      {carregando ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemTarefa}>
              <TouchableOpacity
                style={styles.checkBotao}
                onPress={() => alternarConcluida(item)}
              >
                <Text style={styles.checkTexto}>
                  {item.concluida ? '✓' : '○'}
                </Text>
              </TouchableOpacity>

              <Text
                style={[
                  styles.tituloTarefa,
                  item.concluida && styles.tarefaConcluida
                ]}
              >
                {item.titulo}
              </Text>

              <TouchableOpacity
                style={styles.botaoDeletar}
                onPress={() => deletarTarefa(item._id)}
              >
                <Text style={styles.deletarTexto}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    paddingHorizontal: 20
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    backgroundColor: '#fff',
    fontSize: 16
  },
  botaoAdicionar: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold'
  },
  itemTarefa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2
  },
  checkBotao: {
    marginRight: 12
  },
  checkTexto: {
    fontSize: 20,
    color: '#4CAF50'
  },
  tituloTarefa: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  tarefaConcluida: {
    textDecorationLine: 'line-through',
    color: '#aaa'
  },
  botaoDeletar: {
    backgroundColor: '#e53935',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  deletarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  }
});
