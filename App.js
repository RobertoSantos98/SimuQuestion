
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/Pages/Login';
import Routes from './src/Pages/Routes';

export default function App() {

  const [ logado, setLogado ] = useState(true)

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F26A50"/>
      {logado ? <Routes/> : <Login/>}
    </NavigationContainer>
  );
}
