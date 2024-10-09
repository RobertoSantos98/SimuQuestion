import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../Components/Colors';

export default function Comunidade() {

    const baseURL = 'https://api.github.com';
    const perPage = 20;

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        LoadAPI();
    },[]);

    async function LoadAPI() {
      setLoading(true);

      const response = await axios.get(`${baseURL}/search/repositories?q=react&per_page=${perPage}&page=${page}`);

      setData([...data, ...response.data.items]);
      setPage(page + 1);
      setLoading(false);
    }


 return (
   <View style={styles.container} >
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 24, color: Colors.white, fontWeight: 'bold', marginVertical: 12}} >Perguntas da Comunidade</Text>
      </View>

        <FlatList
          style={{marginTop: 8}}
          contentContainerStyle={{marginHorizontal: 20}}
          data={data}
          keyExtrator={ item => String(item.id)}
          renderItem={ ({item}) => <ListItem data={item} /> }
          onEndReached={LoadAPI}
          onEndReachThreshold={0.1}
          ListFooterComponent={ <FooterList Load={loading} /> }
        />
   </View>
  );
}

function ListItem({data}) {
    return(
      <View style={styles.listItem}>
        <Text style={styles.listText} >{data.full_name}</Text>
        <Text style={styles.listText} >{data.description}</Text>
        <View style={{marginHorizontal: 12, marginVertical: 4}} >
          <TouchableOpacity>
            <Icon name='heart-circle' size={28} color='#FF4136'/>
          </TouchableOpacity>
          
        </View>

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
    elevation: 4
  },
  listText:{
    fontSize: 16,
    marginHorizontal: 12,
    marginVertical: 8
    
  }
})