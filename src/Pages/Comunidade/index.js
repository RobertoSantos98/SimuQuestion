import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../Components/Colors';

export default function Comunidade() {

    const baseURL = 'https://s1207vdg9c.execute-api.us-east-1.amazonaws.com/allquestions';

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        LoadAPI();
    },[]);

    async function LoadAPI() {
      setLoading(true);

      const response = await axios.get(baseURL);

      setData([...data, ...response.data]);
      setLoading(false);
    }


 return (
   <View style={styles.container} >
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 24, color: Colors.white, fontWeight: 'bold', marginVertical: 12}} >Perguntas da Comunidade</Text>
      </View>

        <FlatList
          style={{marginTop: 8, width: '90%'}}
          contentContainerStyle={{marginHorizontal: 4}}
          data={data}
          keyExtrator={ question_id => String(question_id)}
          renderItem={ ({item}) => <ListItem data={item} /> }
          // onEndReached={LoadAPI}
          // onEndReachThreshold={0.1}
          ListFooterComponent={ <FooterList Load={loading} /> }
        />
   </View>
  );
}

function ListItem({data}) {
    return(
      <View style={styles.listItem}>
        <View style={{backgroundColor: Colors.coral, borderRadius: 10}}>
          <Text style={[styles.listText, { fontWeight: 'bold', fontSize: 12, color: Colors.white }]} >{data.user}</Text>
        </View>
        <Text style={[styles.listText, { fontSize: 18}]} >{data.question}</Text>
        <Text style={styles.listText} >{data.correct_answer}</Text>

      </View>
    )
}

function FooterList({ Load }) {
  if (!Load) return null;
  return(
    <View>
      <ActivityIndicator size={40} color={Colors.azulClaro} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.azulMuitoClaro,
    alignItems: 'center'
  },
  titleContainer:{
    backgroundColor: Colors.coral, 
    width: '100%',
    alignItems: 'center', 
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 12
  },
  listItem:{
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 4,
    elevation: 4,
  },
  listText:{
    fontSize: 16,
    marginHorizontal: 12,
    marginVertical: 8
    
  }
})