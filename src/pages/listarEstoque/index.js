import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ListaEstoque() {
  const [estoque, setEstoque] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEstoque();
  }, []);

  function fetchEstoque() {
    fetch('http://localhost:5000/estoque')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar estoque: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.estoque) {
          setEstoque(data.estoque);
          setError(null);
        } else {
          setError('Erro ao carregar o estoque.');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar estoque:', error);
        setError('Erro ao carregar o estoque.');
      });
  }

  const removerItem = (id) => {
    fetch(`http://localhost:5000/estoque/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        alert(data.mensagem);
        fetchEstoque();
      })
      .catch(error => console.error('Erro ao excluir item do estoque:', error));
  };

  const confirmarRemocao = (id) => {
    confirmAlert({
      title: 'Remover Item do Estoque',
      message: 'Tem certeza de que deseja remover este item do estoque?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => removerItem(id)
        },
        {
          label: 'Não',
          onClick: () => console.log('Ação de remoção cancelada')
        }
      ]
    });
  };

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Listar Estoque" />

        {error && <p>{error}</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Entradas</th>
              <th>Saídas</th>
              <th>Quantidade em Estoque</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((item) => (
              <tr key={item.id_produto}>
                <td>{item.id_produto}</td>
                <td>{item.nome_produto}</td>
                <td>{item.entradas}</td>
                <td>{item.saidas}</td>
                <td>{item.quantidade_em_estoque}</td>
                <td className='botoes'>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => confirmarRemocao(item.id_produto)}
                    cursor="pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
