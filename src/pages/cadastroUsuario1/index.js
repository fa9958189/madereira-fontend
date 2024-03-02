import React, { useState } from 'react';
import '../../pages/global.css';
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import Head from '../../componente/Head';
import api from '../../server/api';

export default function CadastroUsuario1() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const salvarUsuario = async (e) => {
        e.preventDefault();
        if (email === "")
            alert("Preencha o campo de email");
        else if (senha === "")
            alert("Preencha o campo de senha");
        else {
            try {
                await api.post('/usuario', { email, senha }); // Alterado para '/usuario'
                alert("Usuário salvo com sucesso");
                navigate("/logon"); // Alterado para redirecionar para a tela de logon
            } catch (error) {
                console.error('Erro ao salvar o usuário:', error);
                alert('Houve um problema ao tentar salvar o usuário');
            }
        }
    }

    return (
        <div className="dashboard-container">
            <Head title="Cadastro de Usuario" />
            <div className='form-container'>
                <form className='form-cadastro' onSubmit={salvarUsuario}>
                    <input
                        type='email' // Alterado para o tipo email
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Digite o seu email'
                    />
                    <input
                        type='password'
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        placeholder='Digite a sua senha'
                    />
                    <div className='acao'>
                        <button className='btn-save'>
                            <FaSave />
                            Salvar
                        </button>
                        <button className='btn-cancel'>
                            <ImCancelCircle />
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
