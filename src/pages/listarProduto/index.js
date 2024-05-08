import React, { useEffect, useState } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import Barrasuperior from '../../componente/Barrasuperior';
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';

export default function Listaproduto() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    mostrarProdutos();
  }, []);

  const mostrarProdutos = () => {
    api.get('/produto')
      .then(res => {
        setProdutos(res.data.produtos);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  };

  const removerProduto = (id) => {
    api.delete(`/produto/${id}`)
      .then(res => {
        if (res.status === 200) {
          alert(`Produto ID ${id} foi excluído com sucesso.`);
          mostrarProdutos();
        } else {
          alert("Houve um problema no servidor");
        }
      })
      .catch(error => {
        console.error('Erro ao excluir produto:', error);
      });
  };

  const apagar = (id) => {
    confirmAlert({
      title: 'Excluir Produto',
      message: 'Deseja realmente excluir esse Produto?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => removerProduto(id)
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
          <Head title="Lista de Produtos" />
          <Link to="/CadastroProduto" className='btn-novo'>Novo Cadastro</Link>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Status</th>
                  <th>Descrição</th>
                  <th>Estoque Mínimo (m)</th>
                  <th>Estoque Máximo (m)</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.status}</td>
                    <td>{produto.descricao}</td>
                    <td>{produto.estoque_minimo}</td>
                    <td>{produto.estoque_maximo}</td>
                    <td className='botoes'>
                      <Link to={`/editarproduto/${produto.id}`}>
                        <FiEdit size={18} color='yellow' />
                      </Link>
                    </td>
                    <td className='botoes'>
                      <FiTrash
                        size={18}
                        color='red'
                        onClick={() => apagar(produto.id)}
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
