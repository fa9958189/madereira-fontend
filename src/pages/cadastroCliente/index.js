import React, { useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import Barrasuperior from '../../componente/Barrasuperior';
import { useNavigate } from 'react-router-dom';
import Head from '../../componente/Head';
import api from '../../server/api';

export default function CadastroCliente() {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nome: '',
        cpf: '',
        cep: '',
        bairro: '',
        logradouro: '',
        cidade: '',
        uf: '',
        contato: '',
        data: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCliente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCepBlur = async (event) => {
        const cep = event.target.value;
        if (cep.length === 8) {
            try {
                const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
                const data = response.data;
                setCliente(prevState => ({
                    ...prevState,
                    bairro: data.bairro || '',
                    logradouro: data.logradouro || '',
                    cidade: data.localidade || '',
                    uf: data.uf || ''
                }));
            } catch (error) {
                console.error("Erro ao consultar CEP:", error);
                alert("Erro ao consultar CEP. Verifique o CEP e tente novamente.");
            }
        }
    };

    const salvarCliente = (e) => {
        e.preventDefault();

        api.post('/cliente', cliente)
            .then(response => {
                console.log(response.data);
                alert("Cliente cadastrado com sucesso!");
                navigate("/listarcliente");
            })
            .catch(error => {
                console.error("Erro ao cadastrar cliente:", error);
                alert("Erro ao cadastrar cliente. Verifique os campos e tente novamente.");
            });
    };

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
                            <div className='corex'> {/* Aplicando a classe corex aqui */}
                                <input
                                    type="text"
                                    name="nome"
                                    value={cliente.nome}
                                    onChange={handleChange}
                                    placeholder="Nome"
                                />
                                <input
                                    type="text"
                                    name="cpf"
                                    value={cliente.cpf}
                                    onChange={handleChange}
                                    placeholder="CPF"
                                />
                                <input
                                    type="text"
                                    name="cep"
                                    value={cliente.cep}
                                    onBlur={handleCepBlur}
                                    onChange={handleChange}
                                    placeholder="CEP"
                                />
                                <input
                                    type="text"
                                    name="bairro"
                                    value={cliente.bairro}
                                    onChange={handleChange}
                                    placeholder="Bairro"
                                />
                                <input
                                    type="text"
                                    name="logradouro"
                                    value={cliente.logradouro}
                                    onChange={handleChange}
                                    placeholder="Logradouro"
                                />
                                <input
                                    type="text"
                                    name="cidade"
                                    value={cliente.cidade}
                                    onChange={handleChange}
                                    placeholder="Cidade"
                                />
                                <input
                                    type="text"
                                    name="uf"
                                    value={cliente.uf}
                                    onChange={handleChange}
                                    placeholder="UF"
                                />
                                <input
                                    type="text"
                                    name="contato"
                                    value={cliente.contato}
                                    onChange={handleChange}
                                    placeholder="Contato"
                                />
                                <input
                                    type="date"
                                    name="data"
                                    value={cliente.data}
                                    onChange={handleChange}
                                    placeholder="Data"
                                />
                                <button className='btn-salvar' type="submit">Cadastrar</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
