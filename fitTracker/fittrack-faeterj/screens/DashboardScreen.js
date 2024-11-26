import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function DashboardScreen({ navigation }) {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    // Simulação de chamada de API para obter progresso do usuário
    const fetchProgress = async () => {
      const data = [
        { name: 'Cardio', status: '', icon: require('../assets/cardio.png') },
        { name: 'Musculação', status: '', icon: require('../assets/muscle.png') },
      ];
      setProgress(data);
    };
    fetchProgress();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Progresso Atual</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/user.svg')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      {progress.map((item, index) => (
        <View key={index} style={styles.progressItem}>
          {item.icon && <Image source={item.icon} style={styles.icon} />}
          <Text style={styles.progressText}>{item.name}: {item.status} Completo</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Classes')}>
        <Text style={styles.buttonText}>Agendamentos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1ECF7',
    padding: 20,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  profileIcon: {
    width: 24,
    height: 24,
  },
  progressItem: {
    backgroundColor: '#F1F5FB',
    padding: 15,
    borderRadius: 10,
    borderColor: '#A1B9D8',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 18,
    color: '#1E3A5F',
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
