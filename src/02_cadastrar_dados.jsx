import React, { Component } from 'react';
import {
    View, 
    Text, 
    StyleSheet ,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { db } from './firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';


class CadastrarDados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      campo1: '',
      campo2: '',
      loading: false,//controlar o botao de salvamento
    };
  }

  cadastrarNoFirebase = async () => {
    const {  campo1, campo2 } = this.state;

    if (campo1 || campo2) {
        alert('Preencha todos os campos');
        return;
    }

    this.setState({ loading: true });

    try {
        //salva os dados no firebase (colecao 'cadastros')
        await addDoc(collection(db, 'cadastros')), {
            campo1: campo1,
            campo2: campo2,
            criadoEm: new Date()
        };
        console.log('Dados cadastrados com sucesso!');

        //limpa os campos apos o cadastro
        this.setState({
            campo1: '',
            campo2: '',
            loading: false,
        });
    } catch (error) {
        console.error('Erro ao cadastrar dados:', error);
        alert('Erro ao cadastrar dados. Tente novamente.');
        this.setState({ loading: false });
    }
 
  }

  render() {

    const { campo1, campo2, loading } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={ styles.titulo }>Cadastrar Dados</Text>

        <TextInput
        style={styles.input}
        placeholder="Digite o campo 1"
        placeholderTextColor="#888"
        value={campo1}
        onChangeText={(texto) => this.setState({ campo1: texto })}
         />
       
        <TextInput
        style={styles.input}
        placeholder="Digite o campo 2"
        placeholderTextColor="#888"
        value={campo2}
        onChangeText={(texto) => this.setState({ campo2: texto })}
            />

        <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={this.cadastrarNoFirebase}
        disabled={loading} //desabilita o botao enquanto estiver salvando
        >
            {loading ? (
                <ActivityIndicator  color="#fff" />
            ) : (
            <Text style={styles.textoBotaoSalvar}>Salvar no Firebase</Text>
            )}
        </TouchableOpacity>
       
    
        
    </ScrollView>
    );
  }
}

export default CadastrarDados;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  titulo: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
   
  },

  botaoSalvar: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

    textoBotaoSalvar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },


});

