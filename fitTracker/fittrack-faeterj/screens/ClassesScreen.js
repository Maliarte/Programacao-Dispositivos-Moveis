import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../firebase.js';

const db = firebase.database();

export default function ClassesScreen() {
  const [aulas, setAulas] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioId = firebase.auth().currentUser.uid;
    db.ref(`usuarios/${usuarioId}`).on('value', (snapshot) => {
      setUsuario(snapshot.val());
    });
    db.ref('aulas').on('value', (snapshot) => {
      const aulasArray = [];
      snapshot.forEach((childSnapshot) => {
        aulasArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setAulas(aulasArray);
    });
    return () => {
      db.ref(`usuarios/${usuarioId}`).off('value');
      db.ref('aulas').off('value');
    };
  }, []);

  const handleInscricao = (aulaId) => {
    const usuarioId = firebase.auth().currentUser.uid;
    db.ref(`usuarios/${usuarioId}/aulasInscritas/${aulaId}`).set(true);
    db.ref(`aulas/${aulaId}/inscritos/${usuarioId}`).set(true);
  };

  const handleCancelarInscricao = (aulaId) => {
    const usuarioId = firebase.auth().currentUser.uid;
    db.ref(`usuarios/${usuarioId}/aulasInscritas/${aulaId}`).remove();
    db.ref(`aulas/${aulaId}/inscritos/${usuarioId}`).remove();
  };

  return (
    <View style={styles.container}>
      {aulas.length > 0 ? (
        aulas.map((aula) => (
          <View key={aula.id} style={styles.aulaContainer}>
            <Text style={styles.aulaNome}>{aula.nome}</Text>
            <Text style={styles.aulaDetalhes}>{aula.data} - {aula.horario} - {aula.duracao}</Text>
            <Text style={styles.aulaInstrutor}>Instrutor: {aula.instrutor}</Text>
            {usuario && usuario.aulasInscritas && usuario.aulasInscritas[aula.id] ? (
              <View>
                <Text style={styles.aulaInscrito}>Você está inscrito!</Text>
                <TouchableOpacity style={styles.aulaBotao} onPress={() => handleCancelarInscricao(aula.id)}>
                  <Text style={styles.aulaBotaoTexto}>Cancelar Inscrição</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.aulaBotao} onPress={() => handleInscricao(aula.id)}>
                <Text style={styles.aulaBotaoTexto}>Inscrever-se</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.semAulas}>Não há aulas disponíveis no momento.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1ECF7',
    padding: 20,
  },
  aulaContainer: {
    backgroundColor: '#F1F5FB',
    padding: 15,
    borderRadius: 10,
    borderColor: '#A1B9D8',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
  },
  aulaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  aulaDetalhes: {
    fontSize: 16,
    color: '#1E3A5F',
  },
  aulaInstrutor: {
    fontSize : 16,
    color: '#1E3A5F',
  },
  aulaInscrito: {
    fontSize: 16,
    color: '#1E3A5F',
    fontWeight: 'bold',
  },
  aulaBotao: {
    backgroundColor: '#1E3A5F',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  aulaBotaoTexto: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  semAulas: {
    fontSize: 18,
    color: '#1E3A5F',
    textAlign: 'center',
  },
});