import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text, Modal, ImageBackground } from 'react-native';

import Loading from '../../Components/Loading';
import Colors from '../../Components/Colors';
import UserServices from '../../Components/UserServices';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login( {onLogin} ) {


    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ emailRegister, setEmailRegister ] = useState();
    const [ nomeRegister, setNomeRegister ] = useState();
    const [ passwordRegister, setPasswordRegister ] = useState();

    const [ loading, setLoading ] = useState(false);
    const [ modalVisible, setModalVisible] = useState(false);

    
    const handleSubmit = async () => {
        const usuarioLogin = {
            email: email,
            senha: password
        }

        setLoading(true);

        try {
            const response = await UserServices.Login(usuarioLogin);
            if (response) {
                const userData ={
                    nome: response.nome,
                    token: response.token
                }
                onLogin(userData);
            } else {
                alert("Verifique suas credenciais;");
            }
            
        } catch (error) {
            alert("Algo deu MUITO ERRADO.");
        } finally {
            setLoading(false);
        }


    }
    
    const handleSubmitRegister = async () => {
            const usuarioregister = {
                email: emailRegister,
                password: passwordRegister,
                nome: nomeRegister
            }
            
            setLoading(true);

            try {

                const response = await UserServices.Register(usuarioregister);
                console.log("Usuário Registrado!");

                setModalVisible(false);

            } catch (error) {
                alert(error);

            } finally {
                setLoading(false);
            }



    }
 return (
       <ImageBackground source={require('../../Assets/SimuQuestion-background.png')} resizeMode='cover' style={{flex:1, alignItems: 'center', justifyContent: 'center'}} >
     {/* <View style={styles.container}> */}
        <Image style={{marginBottom: "10%", width: '70%', height: '50%'}} source={require("../../Assets/logo.png")} />
        <TextInput style={styles.input} placeholder='Digite Seu Email:' value={email} onChangeText={setEmail}/>
        <TextInput style={styles.input} placeholder='Digite Sua Senha:' value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleSubmit} >
            <Text style={{fontSize:24, color: "#FFF", fontWeight:"bold"}} >{loading ? <Loading size={40} color={Colors.white}/> : "Entrar"}</Text>
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
                    <TouchableOpacity style={{alignSelf: 'flex-end', marginHorizontal: '5%', bottom: '12%'}} onPress={() => setModalVisible(false)} >
                        <Icon name="close" size={28} color={Colors.white}/>
                    </TouchableOpacity>
                    
                    <Text style={[styles.title]} allowFontScaling={false}>Preencha os dados abaixo </Text>
                    <TextInput style={styles.input} placeholder='Digite Seu Nome:' value={nomeRegister} onChangeText={setNomeRegister} />
                    <TextInput style={styles.input} placeholder='Digite Seu Email:' value={emailRegister} onChangeText={setEmailRegister} />
                    <TextInput style={styles.input} placeholder='Digite Sua Senha:' value={passwordRegister} onChangeText={setPasswordRegister} />
                    <TouchableOpacity style={styles.button} onPress= {handleSubmitRegister}>
                        <Text style={{fontSize:24, color: "#FFF", fontWeight:"bold"}} >Criar</Text>
                    </TouchableOpacity>
                </View>

            </View>
            
        </Modal>
   {/* </View> */}
   </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // backgroundColor:"#325B70",
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
        borderWidth: 2,
        borderColor: Colors.coral,
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