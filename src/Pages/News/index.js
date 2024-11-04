import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';
import Colors from '../../Components/Colors';

const News = () => {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregando, setCarregando] = useState(false);

  const buscarDados = async (pagina = 1) => {
    setCarregando(true);
    try {
      const resposta = await axios.get(`https://servicodados.ibge.gov.br/api/v3/noticias/?page=${pagina}`);
      const { items, totalPages } = resposta.data;

      setDados(pagina === 1 ? items : [...dados, ...items]);
      setTotalPaginas(totalPages);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  const carregarMais = () => {
    if (paginaAtual < totalPaginas && !carregando) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  useEffect(() => {
    buscarDados(paginaAtual);
  }, [paginaAtual]);

  const renderItem = ({ item }) => (
    <View style={{ marginHorizontal: 20, marginTop: 4, backgroundColor: Colors.azulEscuro, padding: 5, borderRadius: 12 }}>
      <Text style={{ fontWeight: 'bold', color: Colors.white }}>{item.titulo}</Text>
      <Text style={{color: Colors.white}}>{item.introducao}</Text>
      {/* <Text style={{color: Colors.white}}>Data de Publicação: {item.data_publicacao}</Text> */}
      <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
        <Text style={{ color: Colors.azulMedio, fontWeight: 'bold' }}>Leia mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1}}>
      <FlatList
        
        data={dados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.5}
        ListFooterComponent={carregando && <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

export default News;
