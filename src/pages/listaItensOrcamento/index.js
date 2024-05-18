import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiTrash } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import Barrasuperior from '../../componente/Barrasuperior';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';


export default function ListarItensOrcamento() {
 const {id} = useParams();
  const [orcamentos, setOrcamentos] = useState([]);
  const [orcamento,setOrcamento] = useState([]);
  const [nome,setNome] = useState();
  const [numeroorcamento,setNumeroorcamento] = useState();
  const [count, setCount] = useState(0)

  useEffect(() => {
    mostrarOrcamentos();
    mostrarOrcamento();
  }, []);
  const contar = () => {
    const newCount = count + 1;
    setCount(newCount);
    return newCount;
  };
  function mostrarOrcamento() {
    api.get(`/orcamento/${id}`)
      .then(response => {
        setOrcamento(response.data.orcamento);
        setNome(response.data.orcamento[0].nome);
        setNumeroorcamento(response.data.orcamento[0].id)

      })
      .catch(error => console.error('Erro ao buscar orçamento:', error));
  }
  function mostrarOrcamentos() {
    api.get(`/itensorcamento/${id}`)
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
          
          <p>Cliente:{nome}</p>

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
