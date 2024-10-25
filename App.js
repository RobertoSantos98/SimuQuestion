
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/Pages/Login';
import Routes from './src/Pages/Routes';
import Splash from './src/Components/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [ logado, setLogado ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

  const handleLogin = async (userData) => {

    try {
      setLogado(true);
      setUserName(userData.nome);
      await AsyncStorage.setItem("tokenUsuarioLogado", userData.token);
      await AsyncStorage.setItem("nomeUsuarioLogado", userData.nome);
      console.log(userData.nome + " recebido no controller"); 

    } catch (error) {
      console.log("Erro: " + error)
    }
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F26A50"/>
      
      {showSplash ? (
        <Splash /> 
      ) : ( logado ? <Routes userName={userName} /> : ( <Login onLogin={handleLogin} />) )}
    </NavigationContainer>
    
  );
}
