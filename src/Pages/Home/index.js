import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import Colors from '../../Components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonThemes from '../../Components/ButtonThemes'
import UserServices from '../../Components/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProvasList from '../../Components/Provas';



export default function Home( {userName} ) {
  
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ modalOption, setModalOption ] = useState(false);
  const [ modalProvas, setModalProvas ] = useState(false);

  const primeiroNome = userName.split(' ')[0];

  const [ questao, setQuestao ] = useState();
  const [ respostaCerta, setRespostaCerta ] = useState();
  const [ respostaIncorretas, setRespostaIncorretas ] = useState([]);
  const [ theme, setTheme ] = useState();

  const [ todasProvas, setTodasProvas ] = useState([]);
  const [ provasCarregadas, setProvasCarregadas ] = useState();
  const [ diaProva, setDiaProva ] = useState();
  const [ temaProva, setTemaProva ] = useState();

  useEffect(()=> {
    const carregarProvas = async () => {

      try {
        const provasCarregadasMemoria = await AsyncStorage.getItem("Provas");
        const jsonValue = JSON.parse(provasCarregadasMemoria);
        setTodasProvas(jsonValue);
      } catch (error) {
        alert(error)
      }
    }
  }, [todasProvas]);


  
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
        setTheme(null);
        setModalVisible(false);
      }
    } catch (error) {
      alert("Erro: " + error)
    } finally {
      setLoading(false)
    }
  }

  const handleTheme = (tema) => {
    setTheme(tema);
    setModalOption(false);
  }

  const handleProvas = async () => {
    const provas = {
      diaProva: diaProva,
      temaProva: temaProva,
    };
  
    try {
      // Atualizando todasProvas usando a função de estado para garantir o valor atualizado
      setTodasProvas((prevProvas) => {
        const updatedProvas = [...prevProvas, provas];
  
        // Convertendo o array atualizado para JSON e armazenando no AsyncStorage
        const jsonValue = JSON.stringify(updatedProvas);
        AsyncStorage.setItem("Provas", jsonValue);
  
        // return updatedProvas; // Retornando o novo estado para atualização
      });
  
      setModalProvas(false);
    } catch (error) {
      alert(error);
    }
  };


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
              <TouchableOpacity onPress={() => setModalProvas(true)} style={{marginRight: 20}}>
                <Text style={{color: Colors.azulClaro, marginBottom: 10, fontWeight: 'bold' }}>Adicionar Prova</Text>
              </TouchableOpacity>
            </View>

            {todasProvas === null? <Text>Você ainda não adicionou nenhuma prova</Text> : <ProvasList provas={todasProvas}/>}

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
                <TouchableOpacity onPress={() => setModalOption(true)} style={[styles.input, {flexDirection: 'row' ,justifyContent: 'space-between', alignItems: 'center'}]} >
                  {theme ? <Text>{theme}</Text> : <Text style={{color: Colors.azulClaro}}>Selecione o Genero da Pergunta</Text>}
                  <Icon name='chevron-down-box' size={28} color={Colors.azulClaro} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmitQuestion} style={{backgroundColor: Colors.coral, paddingHorizontal: 60, paddingVertical: 6, borderRadius: 12, marginVertical: 8}}>
                  {loading? <ActivityIndicator size={24} color={Colors.white}/> : <Text style={{fontSize: 18, color: Colors.white}}>Enviar</Text> }
                </TouchableOpacity>
              </View>
              
              <Modal visible={modalOption} animationType='none' transparent >
                <View style={styles.modal}>
                  <View style={[styles.containerModal, {width: "50%"}]}>
                    <TouchableOpacity onPress={() => setModalOption(false)} style={{alignSelf: 'flex-end', marginHorizontal: 20}} >
                      <Icon name='close' size={24}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleTheme("Redes")} style={styles.buttonOptionModal} >
                      <Text>Redes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleTheme("Inglês")} style={styles.buttonOptionModal}>
                      <Text>Inglês</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleTheme("Programação")} style={styles.buttonOptionModal}>
                      <Text>Programação</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleTheme("Matemática")} style={styles.buttonOptionModal}>
                      <Text>Matemática</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleTheme("Teórico")} style={styles.buttonOptionModal}>
                      <Text>Teórico</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleTheme("Gerais")} style={styles.buttonOptionModal}>
                      <Text>Gerais</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </Modal>
            </View>
          </Modal>

          <Modal visible={modalProvas} animationType='slide' transparent >
            <View style={styles.modal} >
              <View style={[styles.containerModal, {backgroundColor: Colors.azulEscuro}]} >

                <TouchableOpacity onPress={() => setModalProvas(false)} style={{alignSelf: 'flex-end', marginHorizontal: 20}} >
                  <Icon name='close' size={24}/>
                </TouchableOpacity>

                <TextInput style={styles.input} placeholder='Dia da Prova'/>
                <TextInput style={styles.input} placeholder='Tema da Prova'/>

                <TouchableOpacity onPress={handleProvas} style={[styles.buttonOptionModal, {backgroundColor: Colors.coral}]}>
                  <Text style={{color: Colors.white, fontWeight: 'bold'}}>Salvar</Text>
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
  },
  buttonOptionModal:{
    backgroundColor: Colors.white,
    borderRadius: 8,
    width: '90%',
    paddingVertical: 8,
    marginVertical: 4,
    alignItems: 'center'
  }
})