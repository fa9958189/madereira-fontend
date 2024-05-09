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
          onClick: () => removerOrcamento(id)
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
                  <th>Descrição do Item</th>
                  <th>Quantidade</th>
                  <th>Valor Unitário</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orcamentos && orcamentos.map((orcamento, index) => (
                  <tr key={index}>
                    <td>{orcamento.numero}</td>
                    <td>{orcamento.descricao_item}</td>
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
        </div>
      </div>
    </div>
  );
}
