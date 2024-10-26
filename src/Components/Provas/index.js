import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Colors';

const ProvasList = ({ provas }) => {
  const renderItem = ({ item }) => (
    <View style={styles.conteudoProvas}>
      <View>
        <Text style={{ color: Colors.white, marginVertical: 4 }}> Prova Dia: <Text style={{ fontWeight: 'bold' }}>{item.diaProva}</Text></Text>
        <Text style={{ color: Colors.white, marginVertical: 4 }}>{item.temaProva}</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.coral,
          height: 40,
          width: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="chevron-right" size={36} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={provas}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default ProvasList;

const styles = {
  conteudoProvas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.azulEscuro,
    borderRadius: 10,
    marginHorizontal: 8,
    width: '100%'
  },
};
