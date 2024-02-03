import React from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Listaproduto() {
  const banco = JSON.parse(localStorage.getItem("cd-produtos") || "[]");

  const removerProduto = (id) => {
    // Filtra os produtos mantendo apenas aqueles com IDs diferentes do ID fornecido
    const novosProdutos = banco.filter(produto => produto.id !== id);
    
    // Atualiza o localStorage com a nova lista de produtos
    localStorage.setItem("cd-produtos", JSON.stringify(novosProdutos));
    
    // Atualiza o estado ou recarrega a página para refletir as mudanças
    // (Você pode usar estado se estiver usando um estado de componente)
    // setState({ produtos: novosProdutos });
    // Ou recarrega a página
    window.location.reload();
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
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Lista de Produtos" />
        <Link to="/CadastroProduto" className='btn-novo'>Novo Cadastro</Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Status</th>
              <th>Descrição</th>
              <th>Estoque Mínimo</th>
              <th>Estoque Máximo</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {banco.map((pro) => (
              <tr key={pro.id}>
                <td>{pro.id}</td>
                <td>{pro.status}</td>
                <td>{pro.descricao}</td>
                <td>{pro.estoque_minimo}</td>
                <td>{pro.estoque_maximo}</td>
                <td className='botoes'>
                  <Link to={`/editarproduto/${pro.id}`}>
                    <FiEdit size={18} color='yellow' />
                  </Link>
                </td>
                <td className='botoes'>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagar(pro.id)}
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
