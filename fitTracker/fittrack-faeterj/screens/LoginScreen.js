import { View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import firebase from '../firebase';

const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      navigation.navigate('Dashboard');
    } catch (error) {
      setError('Credenciais de usuário inválidas, tente novamente.');
    }
  };


  const handleForgotPassword = async (email) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('E-mail de redefinição de senha enviado com sucesso!');
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Erro ao enviar e-mail de redefinição de senha: ' + errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Image
          source={logo}
          style={styles.logo}
        />
        <Text style={styles.title}>FitTrack</Text>
      </View>
      <View style={styles.inputContainer}>
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
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onSubmitEditing={login}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleForgotPassword(email)}>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.createAccount}>Criar uma conta</Text>
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
  forgotPassword: {
    color: '#4A90E2',
    marginTop: 15,
    fontSize: 16,
  },
  createAccount: {
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
