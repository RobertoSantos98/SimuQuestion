import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator, FlatList } from 'react-native';
import Colors from '../../Components/Colors';
import Loading from '../../Components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';



export default function Estudar() {
  const [ pontos, setPontos ] = useState();
  console.log(pontos)
  console.log(perguntas)
  
  const [ loading, setLoading ] = useState(true);
  const [ perguntas, setPerguntas ] = useState([]);
  const [ perguntaEscolhida, setPerguntaEscolhida ] = useState();
  const [ perguntaAtual, setPerguntaAtual ] = useState();
  const [ respostasEmbaralhadas, setRespostasEmbaralhadas ] = useState([]);
  const [ cor, setCor ] = useState(null);

  useFocusEffect(
    React.useCallback(()=> {
      buscarQuestions();

  }, [])
);

  const buscarQuestions = async () => {
    try {
      const response = await AsyncStorage.getItem('Questions');
      const jsonValue = response ? JSON.parse(response) : [];
      setPerguntas(jsonValue);
      console.log(jsonValue)

      if(jsonValue.length > 0){
        virarQuestion();
      } else {
        alert("Selecione até dois Temas na página Home.")
      }

    } catch (error) {
      alert("Selecione até dois temas no pagina HOME.")
    } finally {
      setLoading(false)
    }
    
  }
  
  const virarQuestion = () => {
    setLoading(true);
    setCor(null)
    startRotation();
    
    if (perguntas.length > 0) {
      const perguntaIndex = Math.floor(Math.random() * perguntas.length);
      const perguntaAleatoria = perguntas[perguntaIndex]
      setPerguntaAtual({
        tema: perguntaAleatoria.theme,
        Question: perguntaAleatoria.question,
        respostas: [
          perguntaAleatoria.correct_answer,
          ...perguntaAleatoria.incorrect_answers,
        ],
      });

    }
    setLoading(false)
  }
  
  
    const rotateValue = useRef(new Animated.Value(0)).current;
    const startRotation = () => {
      
      Animated.timing(rotateValue, {
        toValue: 1, 
        duration: 500, 
        useNativeDriver: true,
      }).start(() => {
        rotateValue.setValue(0);
      });
    };
    
    
    const rotation = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });


    useEffect(() => {
      if (perguntaAtual?.respostas) {
        setRespostasEmbaralhadas([...perguntaAtual.respostas].sort(() => Math.random() - 0.5));
      }
    }, [perguntaAtual]);

    const escolherRespostas = (resposta) => {
      if (resposta === perguntaAtual.respostas[0]) {
        setCor("#008000")
        virarQuestion();
        adicionarPonto();
      } else {
        alert("Resposta Errada");
        setCor("#FF0000");
        removerPonto();
        
      }
    }

    
    const renderItem = ({ item }) => (
      <TouchableOpacity style={[styles.optionQuestion, cor && {backgroundColor: cor}]} onPress={() => escolherRespostas(item)}>
        <Text style={{fontSize: 16}}>{item}</Text>
      </TouchableOpacity>
    );

    const adicionarPonto = async () => {
      try {
        const novosPontos = pontos + 1;
        setPontos(novosPontos);
        await AsyncStorage.setItem("Pontos", JSON.stringify(novosPontos));
      } catch (error) {
        console.log("Não foi possível atualizar os Pontos");
      }
    };

    const removerPonto = async () => {
      try {
        const novosPontos = pontos-1;
        setPontos(novosPontos);
        await AsyncStorage.setItem("Pontos", JSON.stringify(novosPontos));
      } catch (error) {
        
      }
    }

    const carregarPontos = async () => {
      const pontosSalvos = await AsyncStorage.getItem("Pontos");
      setPontos(pontosSalvos ? JSON.parse(pontosSalvos) : console.log("Não foi possivel salvar os pontos."));
  };
  useEffect(() => {
      carregarPontos();
  }, []);

 return (
   <View style={styles.container} >
      <View style={styles.tileContainer}>
        <Text style={{fontSize: 32, color: Colors.white, fontWeight: 'bold'}}>{loading ? <Loading size={42}/> : (perguntaAtual ? perguntaAtual.tema : <ActivityIndicator size={42} color={Colors.white} />)  }</Text>
      </View>

      <View style={styles.card}>
        
        { !perguntas ? (
          <Animated.View  style={[styles.cardInside, { transform: [{rotateY: rotation}] } ]}>
            <View>
              <Text>Escolha os Temas na Pagina Inicio</Text>
              <ActivityIndicator size={42} color={Colors.coral}/>
            </View>
          </Animated.View>
          ) : (
              <Animated.View style={[styles.cardInside, { transform: [{ rotateY: rotation }] }]}>
                <View style={styles.questionContainer}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {perguntaAtual ? perguntaAtual.Question : "Carregando pergunta..."}
                  </Text>
                  {respostasEmbaralhadas.length > 0 ? (
                    <FlatList
                      data={respostasEmbaralhadas}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  ) : (
                    <ActivityIndicator size={42} color={Colors.coral}/>
                  )}
                </View>
              </Animated.View>
            
            )
        
      }
      </View>

      <TouchableOpacity style={styles.button} onPress={perguntas.length > 0 ? virarQuestion : buscarQuestions}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: Colors.white}}>{perguntas.length > 0 ? "Virar" : "Buscar Questions"}</Text>
      </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.azulMuitoClaro,
    alignItems: 'center'
  },
  tileContainer:{
    backgroundColor: Colors.coral,
    width: '100%',
    paddingTop: '10%',
    paddingBottom: '40%',
    alignItems: 'center',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  card:{
    width: '80%',
    height: '60%',
    backgroundColor: Colors.white,
    position: 'absolute',
    borderRadius: 20,
    elevation: 12,
    marginTop: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardInside:{
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    position: 'absolute',
    borderRadius: 20,
    marginTop: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    marginTop: '100%',
    backgroundColor: Colors.coral,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 12
  },
  questionContainer:{
    width:'100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12
  },
  optionQuestion:{
    backgroundColor: Colors.azulMuitoClaro,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  respostaErrada:{
    backgroundColor: "#FF0000"
  }
})