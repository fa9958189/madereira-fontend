import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../server/api';
import Logo from "../../assets/img/Logo.png";
import "./styles.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");



    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const resposta = await api.post("/usuario/login", { email, senha });
            if (resposta.status >= 200 && resposta.status < 300) {
                alert(resposta.data.mensagem); // Use um método de feedback mais amigável
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || "Erro desconhecido");
            } else {
                setErrorMessage("Erro ao fazer login. Por favor, tente novamente.");
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
             <h1>Faça seu login</h1>
             </div>  
                {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                    <button type="submit" disabled={isLoading}>Entrar</button>
                </form>
            </section>
        </div>
    );
}

export default Login;
