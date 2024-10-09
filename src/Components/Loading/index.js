import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Loading(props) {

    const [iconName, setIconName] = useState('book-outline'); // Nome do ícone inicial
    const icons = [ 'book-outline','book-open-blank-variant', 'book-open-page-variant-outline', 'book-open-variant']; // Lista de ícones

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIconName(prevIcon => {
        const currentIndex = icons.indexOf(prevIcon);
        const nextIndex = (currentIndex + 1) % icons.length;
        return icons[nextIndex];
      });
    }, 800);

    return () => clearInterval(intervalId);
  }, []);

 return (
   <>
        <Icon name={iconName} size={props.size} color={props.color} /> 
   </>
  );
}