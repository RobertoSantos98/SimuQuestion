import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Components/Colors';

export default function Home() {
 return (
   <View style={styles.container} >
        <Text>Tela Home</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.azulClaro
  }
})