import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Barrasuperior from '../../componente/Barrasuperior';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ListarOrcamento() {
  const [orcamentos, setOrcamentos] = useState([]);

  useEffect(() => {
    mostrarOrcamentos();
  }, []);

  function mostrarOrcamentos() {
    fetch('http://localhost:5000/orcamento')
      .then(response => response.json())
      .then(data => {
        console.log(data.orcamentos)
        setOrcamentos(data.orcamentos);
      })
      .catch(error => console.error('Erro ao buscar orçamentos:', error));
  }

  const removerOrcamento = (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`http://localhost:5000/orcamento/${id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        alert(data.mensagem);
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
            fetch(`http://localhost:5000/orcamento/${id}`, { method: 'DELETE' })
              .then(response => response.json())
              .then(data => {
                alert(data.mensagem);
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
