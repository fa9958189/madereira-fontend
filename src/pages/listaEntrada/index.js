import React from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Listaentrada() {
  const banco = JSON.parse(localStorage.getItem("cd-entradas") || "[]");

  const removerEntrada = (id) => {
    const novasEntradas = banco.filter(entrada => entrada.id !== id);
    localStorage.setItem("cd-entradas", JSON.stringify(novasEntradas));
    window.location.reload();
  };

  const apagar = (id) => {
    confirmAlert({
      title: 'Excluir Entrada de Produto',
      message: 'Deseja realmente excluir essa entrada de produto?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => removerEntrada(id)
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
        <Head title="Entrada de Produto" />
        <Link to="/entradaproduto" className='btn-novo'>Nova Entrada</Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Id do Produto</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Data de Entrada</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {banco.map((enpr) => (
              <tr key={enpr.id}>
                <td>{enpr.id}</td>
                <td>{enpr.id_produto}</td>
                <td>{enpr.qtde}</td>
                <td>{enpr.valor_unitario}</td>
                <td>{enpr.data_entrada}</td>
                <td className='botoes'>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagar(enpr.id)}
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
