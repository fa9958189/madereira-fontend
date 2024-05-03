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

export default function ListarTabela() {
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

  const imprimirTabela = () => {
    window.print();
  };

return (
  <div className="dashboard-container">
    <Barrasuperior />
    <div className='dashboard-main'>
 
      <div className='principal'>
        <Head title="Tabela de Preço" />

        <div className='btn-novo'>  
        <button onClick={imprimirTabela}>Imprimir Tabela</button>
        </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Produto</th>
            <th>Valor (m)</th>
          </tr>
        </thead>
        <tbody>
          {entradas.map((enpr) => (
            <tr key={enpr.id}>
              <td>{enpr.id}</td>
              <td>{enpr.descricao}</td>
              <td>{enpr.valor_unitario}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  </div>
);
}