import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../server/api';
import Logo from '../../assets/img/Logo.png'; // Importando a imagem do logo
import './styles.css'; // Importando o arquivo de estilo para centralizar a tela

export default function Logon() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/usuario/logon', { email, senha }); // Alterado para '/logon'
      if (response.status === 200) {
        alert('Login bem-sucedido');
        navigate('/dashboard');
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Houve um problema ao tentar fazer login');
    }
  };

  return (
    <div className="logon-container">
      <div className='logo'>
        <img src={Logo} alt="Logo"></img> {/* Usando a variável Logo para exibir a imagem do logo */}
      </div>
      <section className="form">
        <h1>Faça seu login</h1>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            type="email" // Definindo o tipo de entrada como email
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
          <a href="/cadastroUsuario1">Novo Cadastro</a>
        </form>
      </section>
    </div>
  );
}
