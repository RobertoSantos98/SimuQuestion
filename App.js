
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/Pages/Login';
import Routes from './src/Pages/Routes';
import Splash from './src/Components/Splash';

export default function App() {

  const [ logado, setLogado ] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F26A50"/>
      
      {showSplash ? (
        <Splash /> 
      ) : ( logado ? <Routes /> : <Login /> )}
    </NavigationContainer>
  );
}
