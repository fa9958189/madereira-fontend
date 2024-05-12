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

  function listarClientes() {
    api.get('/cliente')
      .then(res => {
        setClientes(res.data.clientes);
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });
  }

  useEffect(() => {
    listarClientes();
  }, []);

  const removerCliente = (id) => {
    const novosClientes = clientes.filter(cliente => cliente.id !== id);
    setClientes(novosClientes);
    api.delete(`/cliente/${id}`)
      .then(res => {
        if (res.status === 200) {
          console.log(`Cliente com ID ${id} excluído com sucesso!`);
        } else {
          console.error("Erro ao excluir cliente:", res.data);
        }
      })
      .catch(error => {
        console.error("Erro ao excluir cliente:", error);
      });
  };

  const confirmarExclusao = (id) => {
    confirmAlert({
      title: 'Excluir Cliente',
      message: 'Deseja realmente excluir este cliente?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => removerCliente(id)
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
        <div className='menu'> {/* Adicione a classe 'menu' aqui */}
          <Menu />
        </div>
        
        <div className='principal'>
          <Head title="Lista de Clientes" to="/CadastroCliente" />
          
          <div className="table-container">  
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Data de Cadastro</th>
                  <th>Bairro</th>
                  <th>Telefone</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.data}</td>
                    <td>{cliente.bairro}</td>
                    <td>{cliente.telefone}</td>
                    <td className='botoes'>
                      <Link to={`/editarcliente/${cliente.id}`}>
                        <FiEdit size={18} color='yellow' />
                      </Link>
                    </td>
                    <td className='botoes'>
                      <FiTrash
                        size={18}
                        color='red'
                        onClick={() => confirmarExclusao(cliente.id)}
                        cursor="pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
