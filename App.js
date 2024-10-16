
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/Pages/Login';
import Routes from './src/Pages/Routes';
import Splash from './src/Components/Splash';

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

  const handleLogin = (userData) => {
      setLogado(true)
      setUserName(userData.nome)
      console.log(userData.nome + "recebido no controller")
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
