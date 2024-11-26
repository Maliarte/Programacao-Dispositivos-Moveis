import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import logo from '../assets/logo.png';
import firebase from '../firebase'; // Importe o Firebase Namespaced API configurado no projeto

export default function SignupScreen({ navigation }) {
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [confirmaSenha, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const cadastrarUsuario = async (nome, email, senha) => {
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
      const uid = userCredential.user.uid; // UID único do usuário criado

      // Armazena os dados adicionais no Realtime Database
      await firebase.database().ref(`usuarios/${uid}`).set({
        nome: nome,
        email: email,
        aulasInscritas: {}  
      });

      console.log("Usuário cadastrado com sucesso!");
      navigation.navigate('Login');  

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("O email já está em uso. Tente outro.");
      } else {
        setError("Erro ao cadastrar usuário. Tente novamente.");
      }
      console.error("Erro ao cadastrar usuário:", error.message);
    }
  };

  const handleSignup = async () => {
    if (!nome || !email || !senha || !confirmaSenha) {
      setError('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmaSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    await cadastrarUsuario(nome, email, senha); 
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>FitTrack</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#7D8DA1"
          value={nome}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7D8DA1"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#7D8DA1"
          secureTextEntry
          value={senha}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#7D8DA1"
          secureTextEntry
          value={confirmaSenha}
          onChangeText={setConfirmPassword}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>Voltar para Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1ECF7',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#F1F5FB',
    padding: 15,
    borderRadius: 10,
    borderColor: '#A1B9D8',
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 16,
    color: '#1E3A5F',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLogin: {
    color: '#4A90E2',
    marginTop: 15,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});
