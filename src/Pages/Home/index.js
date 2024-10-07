import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../../Components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

 return (
   <View style={styles.container} >
      <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 20, marginVertical: 20, alignItems: 'flex-end'}} >
        <Text style={{fontSize:24, color: Colors.texto, fontWeight: 'bold'}} >Olá Raphael! </Text>
        <View style={{backgroundColor: Colors.coral, paddingHorizontal: 60, paddingVertical: 10, borderRadius: 12}} >
          <Text style={{color: Colors.white}}>Pontos</Text>
          <Text style={{color:Colors.white, fontSize: 24, fontWeight: 'bold'}}>1.720</Text>
        </View>
      </View>
        <View style={styles.banner}>
          <Text style={{color: Colors.white, marginHorizontal: 20}} >Suas questões tiveram</Text>
          <View style={{flexDirection:'row', marginHorizontal: 20, alignItems: 'flex-end'}} >
            <Text style={{fontSize: 40, color: Colors.white,fontWeight: 'bold'}}>405 </Text>
            <Text style={{ color: Colors.white}}>Likes </Text>
          </View>
        </View>

        <View style={{marginLeft: 20, marginVertical: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: Colors.texto, marginBottom: 10, fontWeight: 'bold' }} >Provas Chegando</Text>
              <TouchableOpacity style={{marginRight: 20}}>
                <Text style={{color: Colors.azulClaro, marginBottom: 10, fontWeight: 'bold' }}>Adicionar Prova</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal={true}>

              <View style={styles.conteudoProvas} >
                  <View>
                      <Text style={{color: Colors.white, marginVertical: 4}}>Prova Dia: <Text style={{fontWeight: 'bold'}} >22/11</Text> </Text>
                      <Text style={{color: Colors.white, marginVertical: 4}}>Redes de Computadores</Text>
                      <Text style={{color: Colors.white, marginVertical: 4}}>Faltam 12 dias</Text>
                  </View>
                  <TouchableOpacity style={{backgroundColor: Colors.coral, height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}} >
                    <Icon name='chevron-right' size={36} color={Colors.white} />
                  </TouchableOpacity>
              </View>
              <View style={styles.conteudoProvas} >
                  <Text style={{color: Colors.white, marginHorizontal: 20, marginVertical: 8}}>Prova Dia 22/11</Text>
              </View>

            </ScrollView>
        </View>

        <View style={{marginHorizontal: 20}}>
            <Text style={{color: Colors.texto, marginBottom: 10, fontWeight: 'bold' }}>Últimas Perguntas Enviadas</Text>

            <FlatList>

            </FlatList>
        </View>
        

        
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.azulMuitoClaro
  },
  banner:{
    backgroundColor: Colors.coral,
    width: '100%',
    marginVertical: 12,
    paddingVertical: 24,
    gap: 12
  },
  conteudoProvas:{
    width: 300,
    height:100,
    backgroundColor: Colors.azulEscuro,
    borderRadius:12,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
    
  },
  conteudoPerguntas:{
    width: '90%',
    height:100,
    backgroundColor: Colors.white,
    marginHorizontal: '5%',
    borderRadius:12,
    marginVertical: 10,
    elevation: 8
  }
})