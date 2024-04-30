import React, { useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import Barrasuperior from '../../componente/Barrasuperior';
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import api from '../../server/api';
import { useNavigate } from 'react-router-dom';
import Head from '../../componente/Head';

export default function Cadastroproduto() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estoque_minimo, setEstoque_minimo] = useState("0");
    const [estoque_maximo, setEstoque_maximo] = useState("10");

    function salvardados(e) {
        e.preventDefault();

        // Validação dos campos
        let i = 0;
        if (status === "") i++;
        if (descricao === "") i++;
        if (estoque_minimo === "" || estoque_minimo === "0") i++;
        if (estoque_maximo === "" || estoque_maximo === "0") i++;

        if (i === 0) {
            const novoProduto = {
                status,
                descricao,
                estoque_minimo,
                estoque_maximo
            };

            api.post('/produto', novoProduto, { headers: { "content-type": "application/json" } })
                .then(function (response) {
                    console.log(response.data);
                    alert(response.data.mensagem);
                    navigate("/listaprodutos");
                })
                .catch(function (error) {
                    console.error("Erro ao cadastrar produto:", error);
                });

        } else {
            alert("Por favor, preencha todos os campos.");
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
                    <Head title="Cadastro de Produto" />
                    <div className='form'>
                        <form className='form-cadastro' onSubmit={salvardados}>
                            <input type='text'
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                placeholder='Digite o status'
                            />
                            <input
                                type='text'
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                placeholder='Digite a descrição'
                            />
                            <input
                                type='number'
                                step='0.01' // Permitir valores decimais
                                value={estoque_minimo}
                                onChange={e => setEstoque_minimo(e.target.value)}
                            />
                            <input
                                type='number'
                                step='0.01' // Permitir valores decimais
                                value={estoque_maximo}
                                onChange={e => setEstoque_maximo(e.target.value)}
                            />

                            <div className='acao'>

                                <button type="submit" className='btn-save'> {/* Adicionado type="submit" */}
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
            </div>
        </div>
    )
}
