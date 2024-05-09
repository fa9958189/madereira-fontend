import React, { useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import Barrasuperior from '../../componente/Barrasuperior';
import { useNavigate } from 'react-router-dom';
import Head from '../../componente/Head';
import api from '../../server/api';


export default function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function salvardados(e) {
        e.preventDefault();
        if (nome === "")
            alert("Preencha o campo nome");
        else if (email === "")
            alert("Preencha o campo email");
        else if (senha === "")
            alert("Preencha o campo senha");
        else {
            const usuario = {
                id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
                nome,
                email,
                senha
            };

            api.post('/usuario', usuario, { headers: { "content-type": "application/json" } })
                .then(function (response) {
                    console.log(response.data);
                    alert(response.data.mensagem);
                    navigate("/listausuario");
                })
                .catch(function (error) {
                    console.error("Erro ao cadastrar usuário:", error);
                });
        }
    }

    return (
        <div className="dashboard-container">
                  <Barrasuperior />
      <div className='dashboard-main'>
            <div className='menu'>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro Usuario" />
                <section className="form-container">
                    <form onSubmit={salvardados}>
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
                        <button type="submit">Cadastrar</button>
                    </form>
                </section>
            </div>
            </div>
        </div>
    );
}
