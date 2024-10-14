import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, Dimensions, TouchableOpacity, View, Text } from "react-native";
import { Button } from "react-native-paper";

import Colors from "../Colors";
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Estudar from '../../Pages/Estudar';



const Botao = () => {
  
  const [ temas, setTemas ] = useState(["Math"]);
  
  
  const [ buttonSelected, setButtonSelected ] = useState(false);

  const handlePress = () => {
    buttonSelected ? setButtonSelected(false) : setButtonSelected(true);
    
  }
  
  <Estudar temas={temas}/>
    
    return (
        <View style={styles.container}>
         <TouchableOpacity onPress={handlePress} style={[styles.buttonOption, {backgroundColor: buttonSelected ? Colors.coral : Colors.azulMedio}]} >
            <Text>Matemática</Text>
            <Icon name="plus" size={20} color={Colors.azulEscuro} />
         </TouchableOpacity>
         <TouchableOpacity onPress={handlePress} style={[styles.buttonOption, {backgroundColor: buttonSelected ? Colors.coral : Colors.azulMedio}]} >
            <Text>Inglês</Text>
            <Icon name="plus" size={20} color={Colors.azulEscuro} />
         </TouchableOpacity>
         <TouchableOpacity onPress={handlePress} style={[styles.buttonOption, {backgroundColor: buttonSelected ? Colors.coral : Colors.azulMedio}]} >
            <Text>Redes</Text>
            <Icon name="plus" size={20} color={Colors.azulEscuro} />
         </TouchableOpacity>
        
        <TouchableOpacity style={styles.buttonSalvar}>
            <Text style={{color: Colors.white, fontWeight: 'bold'}}>Salvar</Text>
        </TouchableOpacity>
      </View>

    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 6
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
    },
    buttonSalvar:{
        width: '90%', 
        backgroundColor: Colors.coral, 
        alignItems:'center', 
        borderRadius: 12, 
        paddingVertical: 8,
        marginVertical: 8,
      },
    buttonOption:{
      width: '40%',
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10
    }
  });

export default Botao;