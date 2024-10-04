import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Components/Colors';

export default function Comunidade() {
 return (
   <View style={styles.container} >
        <Text>Tela Comunidade</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.azulClaro
  }
})