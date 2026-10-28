import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from './firebaseConnection';
import { collection, getDocs } from 'firebase/firestore';

class BuscarDados extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            peso: '',
            altura: '',
            status: ''
            
        };
    }
    
    

    async componentDidMount() {
        const referencia = collection(db, 'usuarios');
        const resultado = await getDocs(referencia);

        if (!resultado.empty) {
            const primeiroDoc = resultado.docs[0].data();

            this.setState({
                nome: primeiroDoc.nome,
                email: primeiroDoc.email,
                peso: primeiroDoc.peso,
                altura: primeiroDoc.altura,
                status: primeiroDoc.status,
            });
        }
    }

    

    render() {
        return (
        <View style={styles.container}>
            <Text>Nome: { this.state.nome } </Text>
            <Text>Email: { this.state.email } </Text>
            <Text>Peso: { this.state.peso } </Text>
            <Text>Altura: { this.state.altura } </Text>
            <Text>Status: { this.state.status } </Text>
        </View>
        );
    }
}

export default BuscarDados;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// CRIAR MAIS DADOS NA COLECAO DE USUARIOS E MOSTRAR NA TELA DO APP
//PESO, ALTURA, STATUS, (CASADO, SOLTEIRO, DIVORCIADO, UNIAO ESTAVEL)