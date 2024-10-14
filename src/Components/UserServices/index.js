import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = 'https://s1207vdg9c.execute-api.us-east-1.amazonaws.com';

const Login = async ( usuarioDados ) => {

    // const usuario = {
    //     email: usuarioDados.email,
    //     senha: usuarioDados.senha
    // }

    try {
        const response = await axios.post(`${baseURL}/login`, usuarioDados,{
            headers: {
                'Content-Type':'application/json'
            },
        })
    
        const token = response.data.token;
        await AsyncStorage.setItem('UsuarioToken', token);

        alert("Usuario Logado com sucesso");

        return token
        
        
    } catch (error) {
        alert(`Algo deu Errado: ${error}`);
        
    }

}

const Register = async (usuarioDados) => {

    const registrar = {
        email: usuarioDados.email,
        nomeCompleto: usuarioDados.nome,
        senha: usuarioDados.password
    }

    try {
        const response = await axios.post(`${baseURL}/register`, registrar, {
            headers:{
                'Content-Type':'application/json'
            }
        })
        return response;
        
    } catch (error) {
        alert(`Erro: ${error}`);
    }

}

const Question = async () => {

   

    const response = await axios.get(`${baseURL}/question/theme/Math-General`)

    return response;
}



export default { Login, Register, Question }