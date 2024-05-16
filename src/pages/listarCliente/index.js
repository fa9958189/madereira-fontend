import React, { useEffect, useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';
import Barrasuperior from '../../componente/Barrasuperior';

export default function ListarCliente() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        listarClientes();
    }, []);

    function listarClientes() {
        api.get('/cliente')
            .then(res => {
                setClientes(res.data.clientes);
            })
            .catch(error => {
                console.error('Erro ao buscar clientes:', error);
            });
    }

    const removerCliente = (id_cliente) => {
        api.delete(`/cliente/${id_cliente}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(`Cliente com ID ${id_cliente} excluído com sucesso!`);
                    listarClientes(); // Atualiza a lista após a exclusão
                } else {
                    console.error("Erro ao excluir cliente:", res.data);
                }
            })
            .catch(error => {
                console.error("Erro ao excluir cliente:", error);
            });
    };

    const confirmarExclusao = (id_cliente) => {
        confirmAlert({
            title: 'Excluir Cliente',
            message: 'Deseja realmente excluir este cliente?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => removerCliente(id_cliente)
                },
                {
                    label: 'Não',
                    onClick: () => console.log('Exclusão cancelada')
                }
            ]
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
                    <Head title="Lista de Clientes" to="/CadastroCliente" />

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id Cliente</th>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>CEP</th>
                                    <th>Bairro</th>
                                    <th>Logradouro</th>
                                    <th>Cidade</th>
                                    <th>UF</th>
                                    <th>Contato</th>
                                    <th>Data de Cadastro</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map(cliente => (
                                    <tr key={cliente.id_cliente}>
                                        <td>{cliente.id_cliente}</td>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.cep}</td>
                                        <td>{cliente.bairro}</td>
                                        <td>{cliente.logradouro}</td>
                                        <td>{cliente.cidade}</td>
                                        <td>{cliente.uf}</td>
                                        <td>{cliente.contato}</td>
                                        <td>{cliente.data}</td>
                                        <td className='botoes'>
                                            <Link to={`/editarcliente/${cliente.id_cliente}`}>
                                                <FiEdit size={18} color='yellow' />
                                            </Link>
                                        </td>
                                        <td className='botoes'>
                                            <FiTrash
                                                size={18}
                                                color='red'
                                                onClick={() => confirmarExclusao(cliente.id_cliente)}
                                                cursor="pointer"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="fechar-container">
                        <Link to="/listarTabela" className='btn-fechar' style={{ marginRight: '10px' }} >Vendas por Clientes</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
