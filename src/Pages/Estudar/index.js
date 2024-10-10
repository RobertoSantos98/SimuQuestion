import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Colors from '../../Components/Colors';
import Loading from '../../Components/Loading';

export default function Estudar() {

  const [ loading, setLoading ] = useState(false);

  
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

 return (
   <View style={styles.container} >
      <View style={styles.tileContainer}>
        <Text style={{fontSize: 32, color: Colors.white, fontWeight: 'bold'}}>Redes de Computadores</Text>
      </View>

      <View style={styles.card}>
        <Animated.View  style={[styles.cardInside, { transform: [{rotateY: rotation}] } ]}>
            <Loading size={50} color={Colors.coral} />
        </Animated.View>
      </View>

      <TouchableOpacity style={styles.button} onPress={startRotation}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: Colors.white}}>Virar</Text>
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
  }
})