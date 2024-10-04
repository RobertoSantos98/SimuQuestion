import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../Components/Colors';

export default function Home() {
 return (
   <View style={styles.container} >
      <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 20, marginVertical: 20, alignItems: 'flex-end'}} >
        <Text style={{fontSize:24, color: Colors.white}} >Olá Raphael! </Text>
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
        
        <ScrollView>
          <Text style={{color: Colors.white, marginHorizontal: 20}} >Últimas perguntas enviadas</Text>
          <View style={styles.conteudoPerguntas} >

          </View>
          <View style={styles.conteudoPerguntas} >

          </View>
          <View style={styles.conteudoPerguntas} >

          </View>
          <View style={styles.conteudoPerguntas} >

          </View>
          <View style={styles.conteudoPerguntas} >

          </View>
          <View style={styles.conteudoPerguntas} >

          </View>
          <View style={styles.conteudoPerguntas} >

          </View>
          <View style={styles.conteudoPerguntas} >

          </View>
        </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.azulClaro
  },
  banner:{
    backgroundColor: Colors.coral,
    width: '100%',
    marginVertical: 12,
    paddingVertical: 24,
    gap: 12
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