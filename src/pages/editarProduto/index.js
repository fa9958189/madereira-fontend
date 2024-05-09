import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../componente/Head';
import api from '../../server/api';
import Barrasuperior from '../../componente/Barrasuperior';

export default function EditarProduto() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estoque_minimo, setEstoque_minimo] = useState("");
    const [estoque_maximo, setEstoque_maximo] = useState("");

    useEffect(() => {
        mostrarDados(id); // Passar o ID para a função mostrarDados
    }, [id]); // Adicionar id como dependência para o useEffect

    async function mostrarDados(id) {
        const response = await api.get(`/produto/${id}`);
        const produto = response.data.produto;

        setStatus(produto.status);
        setDescricao(produto.descricao);
        setEstoque_minimo(produto.estoque_minimo);
        setEstoque_maximo(produto.estoque_maximo);
    }

    function salvarDados(e) {
        e.preventDefault();

        if (status === "" || descricao === "" || estoque_minimo === "" || estoque_maximo === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const produto = {
            id,
            status,
            descricao,
            estoque_minimo,
            estoque_maximo
        };

        api.put('/produto', produto, { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                console.log(response.data);
                alert(response.data.mensagem);
                navigate('/listaprodutos');
            })
            .catch(function (error) {
                console.error("Erro ao editar produto:", error);
            });
    }

    return (
        <div className="dashboard-container">
            <Barrasuperior />
            <div className="dashboard-main">
                <div className='menu'>
                    <Menu />
                </div>

                
                <div className='principal'>
                    <Head title="Editar Produto" />
                    
                    <div className='form-container'>
                        <form className='form-cadastro' onSubmit={salvarDados}>
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
                                value={estoque_minimo}
                                onChange={e => setEstoque_minimo(e.target.value)}
                                placeholder='Digite o estoque mínimo'
                            />
                            <input
                                type='number'
                                value={estoque_maximo}
                                onChange={e => setEstoque_maximo(e.target.value)}
                                placeholder='Digite o estoque máximo'
                            />
                            <div className='acao'>
                                <button className='btn-save'>
                                    <FaSave />
                                    Salvar
                                </button>
                                <button className='btn-cancel'>
                                    <MdCancel />
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
