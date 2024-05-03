// Listaentrada.js

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

export default function Listaentrada() {
  const [entradas, setEntradas] = useState([]);

  useEffect(() => {
    mostrarEntradas();
  }, []);

  function mostrarEntradas() {
    api.get('/entrada')
      .then(res => {
        setEntradas(res.data.entradas);
      })
      .catch(error => console.error('Erro ao buscar entradas de produto:', error));
  }

  const removerEntrada = (id) => {
    api.delete(`/entrada/${id}`)
      .then(response => {
        alert(response.data.mensagem);
        mostrarEntradas();
      })
      .catch(error => console.error('Erro ao excluir entrada de produto:', error));
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
                        <Barrasuperior />
      <div className='dashboard-main'>
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Listar Entrada " />
        <Link to="/entradaproduto" className='btn-novo'>Nova Entrada</Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Quantidade</th>
              <th>Valor (m)</th>
              <th>Data de Entrada</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entradas.map((enpr) => (
              <tr key={enpr.id}>
                <td>{enpr.id}</td>
                <td>{enpr.descricao}</td>
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
    </div>
  );
}
