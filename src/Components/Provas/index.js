import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Colors';

const ProvasList = ({ provas, excluirProva }) => {

  const textoLimite = (texto='', limite = 22) => {
    return texto && texto.length > limite ? `${texto.substring(0, limite)}...` : texto;
  }

  console.log(provas)
  const renderItem = ({ item, index }) => (
    <View style={styles.conteudoProvas}>
      <View>
        <Text style={{ color: Colors.white, marginVertical: 4 }}> Prova Dia: <Text style={{ fontWeight: 'bold' }}>{item.diaProva}</Text></Text>
        <Text style={{ color: Colors.white, marginVertical: 4, fontSize:18, marginHorizontal: 6, fontWeight: 'bold' }}>{textoLimite(item.temaProva, 20)}</Text>
      </View>
      <View style={{gap: 12, alignItems: 'flex-end'}} >
      <TouchableOpacity onPress={() => excluirProva(index)}>
          <Icon name='trash-can-outline' size={24} color={Colors.azulMuitoClaro} />
        </TouchableOpacity>
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
    height: 100,
    backgroundColor: Colors.azulEscuro,
    borderRadius: 10,
    marginHorizontal: 8,
    paddingHorizontal: 10,
    width: 300
  },
};
