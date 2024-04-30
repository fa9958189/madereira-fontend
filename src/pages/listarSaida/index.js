import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Barrasuperior from '../../componente/Barrasuperior';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Listasaida() {
  const [saidas, setSaidas] = useState([]);

  useEffect(() => {
    mostrarSaidas();
  }, []);

  function mostrarSaidas() {
    fetch('http://localhost:5000/saida')
      .then(response => response.json())
      .then(data => {
        setSaidas(data.saidas);
      })
      .catch(error => console.error('Erro ao buscar saídas de produto:', error));
  }

  const removerSaida = (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`http://localhost:5000/saida/${id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        alert(data.mensagem);
        mostrarSaidas();
      })
      .catch(error => console.error('Erro ao excluir saída de produto:', error));
  };

  const apagar = (id) => {
    confirmAlert({
      title: 'Excluir Saída de Produto',
      message: 'Deseja realmente excluir essa saída de produto?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => removerSaida(id)
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
        <Head title="Listar Saída" />
        <Link to="/cadastroSaida" className='btn-novo'>Nova Saída</Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Data de Saída</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {saidas && saidas.map((saida) => (
                <tr key={saida.id}>
                  <td>{saida.id}</td>
                  <td>{saida.descricao}</td>
                  <td>{saida.qtde}</td>
                  <td>{saida.valor_unitario}</td>
                  <td>{saida.data_saida}</td>
                  <td className='botoes'>
                    <FiTrash
                      size={18}
                      color='red'
                      onClick={() => apagar(saida.id)}
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
