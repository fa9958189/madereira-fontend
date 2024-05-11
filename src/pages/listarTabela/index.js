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
  const [orcamentos, setOrcamentos] = useState([]);
  const [count, setCount] = useState(0)

  useEffect(() => {
    mostrarOrcamentos();
  }, []);
  const contar = () => {
    const newCount = count + 1;
    setCount(newCount);
    return newCount;
  };
  function mostrarOrcamentos() {
    api.get('/orcamento')
      .then(res => {
        setOrcamentos(res.data.orcamentos);
      })
      .catch(error => console.error('Erro ao buscar orçamentos:', error));
  }

  const imprimirTabela = () => {
    window.print();
  };

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className='dashboard-main'>

        <div className='principal'>
          <Head title="Tabela de Orçamentos" />


          <div className="fechar-container"> {/* Nova div para o botão */}
            <div className='btn-fechar'>
            <button onClick={imprimirTabela}>Imprimir Tabela</button>
            </div>
          </div>
          
          

          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Produto</th>
                <th>Quantidade (m)</th>
                <th>Valor Unitário</th>
                <th>Total</th>
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
                  </tr>
                ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
