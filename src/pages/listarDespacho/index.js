import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiPlusCircle, FiPrinter, FiTrash } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import Barrasuperior from '../../componente/Barrasuperior';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';

export default function ListarDespacho() {
  const { id } = useParams();
  const [orcamentos, setOrcamentos] = useState([]);
  const [count, setCount] = useState(0)
  const [orcamento, setOrcamento] = useState([]);
  const [nome, setNome] = useState();
  const [numeroorcamento, setNumeroorcamento] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    mostrarOrcamentos();
    mostrarOrcamento();
  }, []);
  const contar = () => {
    const newCount = count + 1;
    setCount(newCount);
    return newCount;
  };
  function mostrarOrcamentos() {
    api.get(`/itensorcamento/${id}`)
      .then(res => {
        setOrcamentos(res.data.orcamentos);
      })
      .catch(error => console.error('Erro ao buscar orçamentos:', error));
  }
  function mostrarOrcamento() {
    api.get(`/orcamento/${id}`)
      .then(response => {
        setOrcamento(response.data.orcamento);
        setNome(response.data.orcamento[0].nome);
        setNumeroorcamento(response.data.orcamento[0].id);
        setTotal(response.data.orcamento[0].totalgeral);
      })
      .catch(error => console.error('Erro ao buscar orçamento:', error));
  }

  const imprimirTabela = () => {
    window.print();
  };
  // Função de formatação de moeda
  function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className='dashboard-main'>

        <div className='principal'>
          <Head title="Tabela de Orçamentos" />
          <div className='head_orcamento'>
            <p>Cliente: {nome}</p>
            <p>Orçamento: {numeroorcamento}</p>
           
          </div>

          <div className="fechar-container">
            <div>
              <abbr title='Imprimir Orçamento'>
                <FiPrinter className="btn_imprimir" onClick={imprimirTabela} size={34} />
              </abbr>
            </div>
          </div>
          
        
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Produto</th>
                <th>Quantidade (m)</th>

              </tr>
            </thead>
            <tbody>
             {orcamentos.map((orcamento, index) => (
                  <tr key={orcamento.id}>
                    <td>{index + 1}</td>
                    <td>{orcamento.descricao}</td>
                    <td>{orcamento.quantidade}</td>

                  </tr>
                ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
