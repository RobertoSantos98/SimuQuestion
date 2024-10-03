import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text, Modal } from 'react-native';

import Loading from '../../Components/Loading';
import Colors from '../../Components/Colors';

export default function Login() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ loading, setLoading ] = useState(true);
    const [ modalVisible, setModalVisible] = useState(false);
    

 return (
   <View style={styles.container}>
        <Image style={{marginBottom: "10%", width: '70%', height: '50%'}} source={require("../../Assets/logo.png")} />
        <TextInput style={styles.input} placeholder='Digite Seu Email:' />
        <TextInput style={styles.input} placeholder='Digite Sua Senha:' />
        <TouchableOpacity style={styles.button} >
            <Text style={{fontSize:24, color: "#FFF", fontWeight:"bold"}} >{loading ? <Loading/> : "Entrar"}</Text>
        </TouchableOpacity>
        <View>
            <Text style={{marginVertical: 6, color: "#FFF", fontSize: 16, marginTop: 18}}>Não Possui Uma Conta?</Text>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => setModalVisible(true)} >
                <Text style={styles.create}>Crie sua conta</Text>
            </TouchableOpacity>
        </View>

        <Modal animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={[styles.title]} allowFontScaling={false}>Preencha os dados abaixo </Text>
                    <TextInput style={styles.input} placeholder='Digite Seu Nome:' />
                    <TextInput style={styles.input} placeholder='Digite Seu Email:' />
                    <TextInput style={styles.input} placeholder='Digite Sua Senha:' />
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={{fontSize:24, color: "#FFF", fontWeight:"bold"}} >Criar</Text>
                    </TouchableOpacity>
                </View>

            </View>
            
        </Modal>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#325B70",
        alignItems: 'center',
        justifyContent: 'center'
    },
    input:{
        backgroundColor:"#FFF",
        width: "90%",
        height: 60,
        marginVertical: 8,
        borderRadius: 12,
        paddingHorizontal: 12,
        fontSize: 18,
        elevation: 10,
        borderWidth: 1
    },
    button:{
        backgroundColor:"#F28B6C",
        marginVertical: 8,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        elevation: 8
    },
    create:{
        color: "#FFF",
        marginVertical: 6,
        fontSize: 18,
        fontWeight: 'bold'
    },
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent:{
        height:'70%',
        width:'90%',
        backgroundColor:"#325B70",
        borderRadius: 12,
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        textAlign: 'center',
        fontSize: 24,
        color: "#FFF",
        marginBottom:'10%',

    }
    
})