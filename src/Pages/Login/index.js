import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';

import Loading from '../../Components/Loading';

export default function Login() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    

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
            <TouchableOpacity style={{alignItems: 'center', gap: 12}} >
                <Text style={styles.create}>Crie sua conta</Text>
            </TouchableOpacity>
        </View>
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
        elevation: 10
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
    }

})