import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importe o axios
import Logo from "../../assets/img/Logo.png";
import "./styles.css"; // Importe o arquivo de estilos CSS

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const api = axios.create({
        baseURL: 'http://sua-url-da-api.com' // Substitua pelo URL da sua API
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const resposta = await api.post("/usuario/login", { email, senha });
            if (resposta.status === 200) {
                alert(resposta.data.mensagem);
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert(error.response.data.mensagem);
            } else {
                console.error('Erro ao fazer login:', error);
            }
        }
    };

    return (
        <div className="logon-container">
            <div className='logo-container'>
                <img src={Logo} alt="Logo" className="logo-image" /> {/* Substitua pelo caminho correto da sua imagem */}
            </div>
            <section className="form">
                <h1>Faça seu login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button type="submit">Entrar</button>
                </form>
            </section>
        </div>
    );
}

export default Login;
