import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';   // Corrigido o caminho
import DashboardScreen from './screens/DashboardScreen'; // Corrigido o caminho
import ClassesScreen from './screens/ClassesScreen'; // Corrigido o caminho
import ProfileScreen from './screens/ProfileScreen'; // Corrigido o caminho
import CadastroScreen from './screens/CadastroScreen'; // Corrigido o caminho
import { initializeApp } from "firebase/app";
import 'firebase/auth';

//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCFMr9o8_e0AF9U4f1NIqbx5lkUjrvieAQ",
  authDomain: "fittrack-faeterj.firebaseapp.com",
  databaseURL: "https://fittrack-faeterj-default-rtdb.firebaseio.com",
  projectId: "fittrack-faeterj",
  storageBucket: "fittrack-faeterj.appspot.com",
  messagingSenderId: "700588845228",
  appId: "1:700588845228:web:d882133aac2245a8299709",
  measurementId: "G-J7SX8ZB1ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen 
          name="Classes" 
          component={ClassesScreen} 
          options={{ title: 'Aulas' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Perfil' }}
        />
        <Stack.Screen 
          name="Cadastro"
          component={CadastroScreen} 
          options={{ title: 'Cadastro' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}