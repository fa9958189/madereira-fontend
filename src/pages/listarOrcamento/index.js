import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiBookOpen, FiPlus, FiTrash } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import Barrasuperior from '../../componente/Barrasuperior';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';
import {Link,useNavigate} from "react-router-dom"

export default function ListarOrcamento() {
  const navigate = useNavigate();
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

    // Função de formatação de moeda
    function formatarMoeda(valor) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valor);
    }

  const removerOrcamento = (id) => {
    api.delete(`/orcamento/${id}`)
      .then(response => {
        alert(response.data.mensagem);
        mostrarOrcamentos();
      })
      .catch(error => console.error('Erro ao excluir orçamento:', error));
  };

  // const abrir = (id) => {

  //           api.get(`/itensorcamento/${id}`)
  //             .then(response => {
  //               mostrarOrcamentos();
  //             })
  //             .catch(error => console.error('Erro ao excluir orçamento:', error));

  // };

  function salvarOrcamento(e) {
    e.preventDefault();
    confirmAlert({
        title: 'Confirmação',
        message: 'Deseja abrir um novo orçamento?',
        buttons: [
            {
                label: 'Sim',
                onClick: () => {
                    api.post('/orcamento', { id: selectedClientId })
                        .then(response => {
                            alert(response.data.mensagem);
                            mostrarOrcamentos();
                        })
                        .catch(error => {
                            console.error('Erro ao cadastrar orçamento:', error);
                            alert('Erro ao cadastrar orçamento: ' + error.message);
                        });
                }
            },
            {
                label: 'Não',
                onClick: () => {}
            }
        ]
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
          <Head title="Listar Orçamento" />
          {/* <Link to="/cadastroOrcamento" className='btn-novo'>Novo Orçamento</Link> */}

          <div>
          <select 
                    id="client" 
                    value={selectedClientId} 
                    onChange={e => setSelectedClientId(e.target.value)}
                >
                    <option value="">Selecionar Cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id_cliente} value={cliente.id_cliente}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
            <CiCirclePlus onClick={salvarOrcamento} size={30} color="green"/>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Total Orçamento</th>
                  <th>Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orcamentos.map((orcamento, index) => (
                  <tr key={orcamento.id}>
                  
                    <td>{index + 1}</td>
                    <td>{orcamento.nome}</td>
                    <td>{formatarMoeda(orcamento.totalgeral)}</td>
                    <td>{orcamento.data}</td>
                    <td className='botoes'>


                                          <Link to={`/listaritensorcamento/${orcamento.id}`}>
                                          <FiBookOpen
                                          size={18}
                                          color='red'
                                          cursor="pointer"
                                        />

                                          </Link>
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
