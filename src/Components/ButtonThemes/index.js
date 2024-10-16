import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";

import Colors from "../Colors";
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Estudar from '../../Pages/Estudar';



const Botao = () => {
  
  const [ temas, setTemas ] = useState([]);
  

  const handlePress = (tema) => {

    setTemas((prevTemas) => {

      if (prevTemas.includes(tema)) {
        console.log("removido " + tema);
        return prevTemas.filter(t=> t !== tema);

      } else {
        console.log("adinionado " + tema);
        return [...prevTemas, tema];
      }
    })
  }

  const isSelected = (tema) => temas.includes(tema);
  
    
    return (
      <View>
        <ScrollView horizontal style={styles.container}>

          <View>
            <TouchableOpacity onPress={() => handlePress("Matemática")} style={[styles.buttonOption,isSelected("Matemática") && styles.selectedButton]} >
                <Text>Matemática</Text>
                <Icon name="plus" size={20} color={Colors.azulEscuro} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress("Inglês")} style={[styles.buttonOption,isSelected("Inglês") && styles.selectedButton]} >
                <Text>Inglês</Text>
                <Icon name="plus" size={20} color={Colors.azulEscuro} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress("Redes")} style={[styles.buttonOption,isSelected("Redes") && styles.selectedButton]} >
                <Text>Redes</Text>
                <Icon name="plus" size={20} color={Colors.azulEscuro} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => handlePress("Programação")} style={[styles.buttonOption,isSelected("Programação") && styles.selectedButton]} >
                <Text>Programação</Text>
                <Icon name="plus" size={20} color={Colors.azulEscuro} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress("POO")} style={[styles.buttonOption,isSelected("POO") && styles.selectedButton]} >
                <Text>POO</Text>
                <Icon name="plus" size={20} color={Colors.azulEscuro} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress("Gerais")} style={[styles.buttonOption,isSelected("Gerais") && styles.selectedButton]} >
                <Text>Gerais</Text>
                <Icon name="plus" size={20} color={Colors.azulEscuro} />
            </TouchableOpacity>
          </View>

      </ScrollView>
        <TouchableOpacity style={styles.buttonSalvar}>
            <Text style={{color: Colors.white, fontWeight: 'bold'}}>Salvar</Text>
        </TouchableOpacity>

      </View>

    )
}

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
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
        marginHorizontal: '5%'
      },
    buttonOption:{
      width: 170,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginHorizontal: 4,
      marginVertical: 4
    },
    selectedButton:{
      backgroundColor: Colors.coral
    }
  });

export default Botao;