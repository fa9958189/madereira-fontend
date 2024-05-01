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

  useEffect(() => {
    mostrarOrcamentos();
  }, []);

  function mostrarOrcamentos() {
    api.get('/orcamento')
      .then(res => {
        setOrcamentos(res.data.orcamentos);
      })
      .catch(error => console.error('Erro ao buscar orçamentos:', error));
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
          <Head title="Listar Orçamentos" />
          <Link to="/cadastroOrcamento" className='btn-novo'>Novo Orçamento</Link>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Produto</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Total</th>
                <th>Data de Saída</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orcamentos.map((orcamento) => (
                <tr key={orcamento.id}>
                  <td>{orcamento.id}</td>
                  <td>{orcamento.nome_produto}</td>
                  <td>{orcamento.quantidade}</td>
                  <td>R$ {orcamento.valor_unitario}</td>
                  <td>R$ {orcamento.total}</td>
                  <td>{orcamento.data_saida}</td>
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
  );
}
