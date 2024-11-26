import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase'; // Firebase Namespaced API

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({ nome: '', email: '' });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;

        if (user) {
          const uid = user.uid;
          const userRef = firebase.database().ref(`usuarios/${uid}`);
          const snapshot = await userRef.once('value');

          if (snapshot.exists()) {
            const { nome, email, photoURL } = snapshot.val();
            setUserData({ nome, email });
            setProfileImage(photoURL || null);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) return;

      const uid = user.uid;
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`profileImages/${uid}`);
      
      await ref.put(blob);
      const downloadURL = await ref.getDownloadURL();

      // Atualiza a foto no banco de dados
      const userRef = firebase.database().ref(`usuarios/${uid}`);
      await userRef.update({ photoURL: downloadURL });

      setProfileImage(downloadURL);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error.message);
    }
  };

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Login');
    }).catch(error => {
      console.error('Erro ao sair:', error.message);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Perfil do Usuário</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileImageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : { uri: 'https://via.placeholder.com/120' } // URL placeholder
          }
          style={styles.profileImage}
        />
        <Button title="Alterar Foto" onPress={handleImagePicker} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nome: {userData.nome}</Text>
        <Text style={styles.infoText}>Email: {userData.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1ECF7',
    padding: 20,
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
  logoutText: {
    fontSize: 16,
    color: '#FF0000',
  },
  profileImageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#1E3A5F',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#1E3A5F',
    marginBottom: 10,
  },
});
