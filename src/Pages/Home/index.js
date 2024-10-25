import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import Colors from '../../Components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonThemes from '../../Components/ButtonThemes'
import UserServices from '../../Components/UserServices';



export default function Home( {userName} ) {
  
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ modalOption, setModalOption ] = useState(false);

  const primeiroNome = userName.split(' ')[0];

  const [ questao, setQuestao ] = useState();
  const [ respostaCerta, setRespostaCerta ] = useState();
  const [ respostaIncorretas, setRespostaIncorretas ] = useState([]);
  const [ theme, setTheme ] = useState();
  
  const handleSubmitQuestion = async () => {

    const questaoEnviar = {
      question: questao,
      correct_answer: respostaCerta,
      incorrect_answers: [respostaIncorretas[0], respostaIncorretas[1], respostaIncorretas[2]],
      theme: "Redes"
    }

    setLoading(true);

    try {
      const response = await UserServices.Question(questaoEnviar);
      if (response) {
        alert("Question Enviada");
        setQuestao('');
        setRespostaCerta('');
        setRespostaIncorretas([]);
        setTheme('');
        setModalVisible(false);
      }
    } catch (error) {
      alert("Erro: " + error)
    } finally {
      setLoading(false)
    }
  }



 return (
   <View style={styles.container} >
      <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 20, marginVertical: 20, alignItems: 'flex-end'}} >
        <Text style={{fontSize:24, color: Colors.texto, fontWeight: 'bold'}} >Olá, {primeiroNome}! </Text>
        <View style={{backgroundColor: Colors.coral, paddingHorizontal: 60, paddingVertical: 10, borderRadius: 12}} >
          <Text style={{color: Colors.white}}>Pontos</Text>
          <Text style={{color:Colors.white, fontSize: 24, fontWeight: 'bold'}}>1.720</Text>
        </View>
      </View>
        <View style={styles.banner}>
          <Text style={{color: Colors.white, marginHorizontal: 20}} >Suas questões tiveram</Text>
          <View style={{flexDirection:'row', marginHorizontal: 20, alignItems: 'flex-end'}}>
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
          <Text style={{color: Colors.texto, marginBottom: 10, fontWeight: 'bold' }}>Escolha 2 temas para Estudar</Text>
        </View>

        <ButtonThemes/>

        <View style={{marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: Colors.texto, marginBottom: 10, fontWeight: 'bold' }}>Últimas Perguntas Enviadas</Text>
            
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={{color: Colors.azulClaro, marginBottom: 10, fontWeight: 'bold' }}>Enviar Pergunta</Text>
            </TouchableOpacity>  
        </View>
        
          <Modal visible={modalVisible} animationType="slide" transparent >
            <View style={styles.modal} >

              <View style={styles.containerModal} >
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{alignSelf: 'flex-end', marginHorizontal: 20}} >
                  <Icon name='close' size={24}/>
                </TouchableOpacity>
                <Text style={{fontSize: 22, color: Colors.texto, fontWeight: 'bold', marginVertical: 8}}>Insira um novo card</Text>

                <TextInput style={styles.input} placeholder='Questão' value={questao} onChangeText={setQuestao} />
                <TextInput style={styles.input} placeholder='Resposta Certa' value={respostaCerta} onChangeText={setRespostaCerta} />
                <TextInput style={styles.inputRespostasIncorretas} placeholder='Resposta Incorreta' value={respostaIncorretas[0]} onChangeText={setRespostaIncorretas[0]} />
                <TextInput style={styles.inputRespostasIncorretas} placeholder='Resposta Incorreta' value={respostaIncorretas[1]} onChangeText={setRespostaIncorretas[1]} />
                <TextInput style={styles.inputRespostasIncorretas} placeholder='Resposta Incorreta' value={respostaIncorretas[2]} onChangeText={setRespostaIncorretas[2]} />
                <TouchableOpacity style={[styles.input, {flexDirection: 'row' ,justifyContent: 'space-between', alignItems: 'center'}]} onPress={() => setModalOption(true)} >
                  <Text style={{color: Colors.azulClaro}}>Selecione o Genero da Pergunta</Text>
                  <Icon name='chevron-down-box' size={28} color={Colors.azulClaro} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmitQuestion} style={{backgroundColor: Colors.coral, paddingHorizontal: 60, paddingVertical: 6, borderRadius: 12, marginVertical: 8}}>
                  {loading? <ActivityIndicator size={24} color={Colors.white}/> : <Text style={{fontSize: 18, color: Colors.white}}>Enviar</Text> }
                </TouchableOpacity>
              </View>
              
            </View>

          </Modal>

        
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
  },
  modal:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  input:{
    width: '90%',
    height: 50,
    backgroundColor: Colors.white,
    fontSize: 18,
    marginVertical: 4,
    borderRadius: 12,
    paddingHorizontal: 8,
    borderWidth: 1
  },
  inputRespostasIncorretas:{
    width: '80%',
    height: 40,
    alignSelf: 'flex-end',
    backgroundColor: Colors.white,
    fontSize: 18,
    marginVertical: 4,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 8,
    borderWidth: 1
  },
  containerModal:{
    backgroundColor: Colors.azulClaro,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 12,
    width: '95%'
  }
})