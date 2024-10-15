import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator, FlatList } from 'react-native';
import Colors from '../../Components/Colors';
import Loading from '../../Components/Loading';
import UserServices from '../../Components/UserServices';



export default function Estudar() {

  const [ loading, setLoading ] = useState(false);
  const [ perguntas, setPerguntas ] = useState(null);
  const [ perguntaEscolhida, setPerguntaEscolhida ] = useState(null);
  const [ perguntaAtual, setPerguntaAtual ] = useState(null);
  const [ respostasEmbaralhadas, setRespostasEmbaralhadas ] = useState([]);

  
  const buscarQuestions = async () => {
    setLoading(true)
    try {
      const response = await UserServices.Question()
      setPerguntas(response.data);
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
    
  }
  
  const virarQuestion = () => {
    setLoading(true);
    startRotation();
    
    if (perguntas) {
      const perguntaIndex = Math.floor(Math.random() * perguntas.length);
      const perguntaEscolhida = perguntas[perguntaIndex]
      setPerguntaEscolhida(perguntaEscolhida);

      setPerguntaAtual({
        tema: perguntaEscolhida.theme,
        Question: perguntaEscolhida.question,
        respostas: [
          perguntaEscolhida.correct_answer,
          perguntaEscolhida.incorrect_answers[0],       
          perguntaEscolhida.incorrect_answers[1],       
          perguntaEscolhida.incorrect_answers[2]       
        ]
      })

      // const embaralharArray = (array) => {
      //     return array.sort(() => Math.random() - 0.5);
      //  };
      
      // setRespostasEmbaralhadas(embaralharArray([...perguntaAtual.respostas])); // Cópia e embaralha

    }
    setLoading(false)
  }
  
  useEffect(() => {
    const embaralharArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    try {
      setRespostasEmbaralhadas(embaralharArray([...perguntaAtual.respostas])); // Cópia e embaralha
      
    } catch (error) {
      alert("erro ao carregar respostas: " + error)
    }

  }, [perguntaAtual]);
  
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



    const escolherRespostas = (resposta) => {
      if (resposta === perguntaAtual.respostas[0]) {
        virarQuestion()
        
      } else {
        alert("Resposta Errada");
        return false
        
      }
      // {backgroundColor: {escolherRespostas} ? "#0080000" : "#FF0000"}
    }
    const avaliar = async (resposta) => {await escolherRespostas(resposta)};

    
    const renderItem = ({ item }) => (
      <TouchableOpacity style={[styles.optionQuestion]} onPress={() => escolherRespostas(item)}>
        <Text style={{fontSize: 16}}>{item}</Text>
      </TouchableOpacity>
    );

 return (
   <View style={styles.container} >
      <View style={styles.tileContainer}>
        <Text style={{fontSize: 32, color: Colors.white, fontWeight: 'bold'}}>{loading ? <Loading size={42}/> : (perguntaAtual ? perguntaAtual.tema : <ActivityIndicator size={42} color={Colors.white} />)  }</Text>
      </View>

      <View style={styles.card}>
        
        { !perguntaAtual ? (
          <Animated.View  style={[styles.cardInside, { transform: [{rotateY: rotation}] } ]}>
            <View>
              <ActivityIndicator size={42} color={Colors.coral}/>
            </View>
          </Animated.View>) : 
            (<Animated.View  style={[styles.cardInside, { transform: [{rotateY: rotation}] } ]}>
                <View style={styles.questionContainer}>
                  <View>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}} >{perguntaEscolhida.question}</Text>
                  </View>
                  <View>
                    {respostasEmbaralhadas === null ? (<ActivityIndicator size={42}/>) : (
                      <FlatList 
                        data={respostasEmbaralhadas}
                        renderItem={renderItem}
                        
                      />
                    )
                    
                  }
                  </View>
                </View>
            </Animated.View>)
        
      }
      </View>

      <TouchableOpacity style={styles.button} onPress={perguntas != null ? virarQuestion : buscarQuestions}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: Colors.white}}>{perguntas != null ? "Virar" : "Começar"}</Text>
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