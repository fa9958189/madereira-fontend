import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../assets/img/Logo.png";
import "./styles.css";

function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const api = axios.create({
        baseURL: 'http://localhost:5000/usuario'
    });

    const handleCadastro = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const resposta = await api.post("/", { nome, email, senha });
            if (resposta.status >= 200 && resposta.status < 300) {
                alert(resposta.data.mensagem); // Use um método de feedback mais amigável
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || "Erro desconhecido");
            } else {
                setErrorMessage("Erro ao fazer cadastro. Por favor, tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="logon-container">
            <div className='logo-container'>
                <img src={Logo} alt="Logo" className="logo-image" />
            </div>
            <section className="form">
             <div className='preto'>
             <h1>Faça seu Cadastro</h1>
             </div>  
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleCadastro}>
                    <input
                        placeholder="Nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
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
                    <button type="submit" disabled={isLoading}>Cadastrar</button>
                </form>
            </section>
        </div>
    );
}

export default Cadastro;
