import React, { useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import Barrasuperior from '../../componente/Barrasuperior';
import { useNavigate } from 'react-router-dom';
import Head from '../../componente/Head';
import api from '../../server/api';

export default function CadastroCliente() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [data, setData] = useState("");
    const [bairro, setBairro] = useState("");
    const [telefone, setTelefone] = useState("");

    function salvarCliente(e) {
        e.preventDefault();
        const novoCliente = {
            nome,
            cpf,
            data,
            bairro,
            telefone
        };

        api.post('/cliente', novoCliente)
            .then(response => {
                console.log(response.data);
                alert("Cliente cadastrado com sucesso!");
                navigate("/listarcliente");
            })
            .catch(error => {
                console.error("Erro ao cadastrar cliente:", error);
                alert("Erro ao cadastrar cliente. Verifique os campos e tente novamente.");
            });
    }

    return (
        <div className="dashboard-container">
            <Barrasuperior />
            <div className='dashboard-main'>
                <div className='menu'>
                    <Menu />
                </div>
                <div className='principal'>
                    <Head title="Cadastro de Cliente" />
                    <section className="form-container">
                        <form onSubmit={salvarCliente}>
                            <input
                                placeholder="Nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <input
                                placeholder="CPF"
                                type="text"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <input
                                placeholder="Data de Cadastro"
                                type="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                            <input
                                placeholder="Bairro"
                                type="text"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                            />
                            <input
                                placeholder="Telefone"
                                type="text"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                            <button type="submit">Cadastrar</button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
