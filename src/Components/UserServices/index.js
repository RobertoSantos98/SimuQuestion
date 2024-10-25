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

        const dados = {
            token : response.data.token,
            nome : response.data.nomeCompleto
        }
        
        await AsyncStorage.setItem('UsuarioToken', dados.token);
        return dados;
        
        
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

const Question = async (questao) => {

    try {
        const token = await AsyncStorage.getItem('tokenUsuarioLogado')
        const response = await axios.post(`${baseURL}/question`, questao, {
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })

        if (response) {
            return response       
        } else {
            alert("Algo deu errado, Verifique os campos e tente novamente.")
        }
        
    } catch (error) {
        alert(error)
    }


    return response;
}

const QuestionTemas = async (temas) => {
    if (temas === null) {
       return alert("Escolha dois temas")
    }

    const temasPesquisar = `${temas[0]}-${temas[1]}`

    const response = await axios.get(`${baseURL}/question/theme/${temasPesquisar}`);
    return response;
}



export default { Login, Register, Question, QuestionTemas }