import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Barrasuperior from '../../componente/Barrasuperior';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';

export default function ListarOrcamento() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedClientInfo, setSelectedClientInfo] = useState(null);

  useEffect(() => {
    mostrarOrcamentos();
    mostrarClientes();
  }, []);

  function mostrarOrcamentos() {
    api.get('/orcamento')
      .then(response => {
        setOrcamentos(response.data.orcamentos);
      })
      .catch(error => console.error('Erro ao buscar orçamentos:', error));
  }

  function mostrarClientes() {
    api.get('/cliente')
      .then(response => {
        setClientes(response.data.clientes);
      })
      .catch(error => console.error('Erro ao buscar clientes:', error));
  }

  const removerOrcamento = (id) => {
    api.delete(`/orcamento/${id}`)
      .then(response => {
        alert(response.data.mensagem);
        mostrarOrcamentos();
      })
      .catch(error => console.error('Erro ao excluir orçamento:', error));
  };

  const apagar = (id) => {
    confirmAlert({
      title: 'Excluir Orçamento',
      message: 'Deseja realmente excluir esse orçamento?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.delete(`/orcamento/${id}`)
              .then(response => {
                alert(response.data.mensagem);
                mostrarOrcamentos();
              })
              .catch(error => console.error('Erro ao excluir orçamento:', error));
          }
        },
        {
          label: 'Não',
          onClick: () => alert('Clique em Não')
        }
      ]
    });
  };

  const handleSelectClient = (clientId) => {
    setSelectedClientId(clientId);
    if (clientId) {
      api.get(`/cliente/${clientId}`)
        .then(response => {
          console.log('Cliente data:', response.data);  // Adicione este log
          setSelectedClientInfo(response.data.cliente);
        })
        .catch(error => console.error('Erro ao buscar informações do cliente:', error));
    } else {
      setSelectedClientInfo(null);
    }
  };

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className='dashboard-main'>
        <div className='menu'>
          <Menu />
        </div>
        <div className='principal'>
          <Head title="Listar Orçamento" />
          <Link to="/cadastroOrcamento" className='btn-novo'>Novo Orçamento</Link>

          <div>
            <select value={selectedClientId} onChange={(e) => handleSelectClient(e.target.value)}>
              <option value="">Selecionar Cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </select>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Produto</th>
                  <th>Quantidade (m)</th>
                  <th>Valor (m)</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orcamentos.map((orcamento, index) => (
                  <tr key={orcamento.id}>
                    <td>{index + 1}</td>
                    <td>{orcamento.descricao}</td>
                    <td>{orcamento.quantidade}</td>
                    <td>{orcamento.valor_unitario}</td>
                    <td>{orcamento.total}</td>
                    <td className='botoes'>
                      <FiTrash
                        size={18}
                        color='red'
                        onClick={() => apagar(orcamento.id)}
                        cursor="pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedClientInfo && (
            <div>
              <h3>Informações do Cliente</h3>
              <p>ID: {selectedClientInfo.id}</p>
              <p>Nome: {selectedClientInfo.nome}</p>
              <p>CPF: {selectedClientInfo.cpf}</p>
              <p>CEP: {selectedClientInfo.cep}</p>
              <p>Endereço: {selectedClientInfo.endereco}</p>
              <p>Telefone: {selectedClientInfo.telefone}</p>
              <p>E-mail: {selectedClientInfo.email}</p>
            </div>
          )}

          <div className="fechar-container">
            <Link to="/listarTabela" className='btn-fechar' style={{ marginRight: '10px' }} >Clientes</Link>
            <Link to="/listarTabela" className='btn-fechar' style={{ marginRight: '10px' }}>Despacho</Link>
            <Link to="/listarTabela" className='btn-fechar' style={{ marginRight: '10px' }}>Status</Link>
            <Link to="/listarTabela" className='btn-fechar' style={{ marginRight: '10px' }}>Confirma venda</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
