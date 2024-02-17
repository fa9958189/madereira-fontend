import React from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Listaentrada() {
  const entradas = JSON.parse(localStorage.getItem("cd-entradas") || "[]");
  const saidas = JSON.parse(localStorage.getItem("cd-saidas") || "[]");

  const removerEntrada = (id) => {
    const novasEntradas = entradas.filter(entrada => entrada.id !== id);
    localStorage.setItem("cd-entradas", JSON.stringify(novasEntradas));
    window.location.reload();
  };

  const calcularQuantidadeSaida = (id_produto) => {
    const quantidadeEntrada = entradas.filter(entrada => entrada.id_produto === id_produto)
                                       .reduce((total, entrada) => total + entrada.qtde, 0);
    const quantidadeSaida = saidas.filter(saida => saida.id_produto === id_produto)
                                  .reduce((total, saida) => total + saida.qtde, 0);
    return quantidadeSaida;
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

  function mostrarnome(idproduto){
    let nome= "";
     const listarproduto = JSON.parse(localStorage.getItem("cd-produtos") || "[]");
     listarproduto.
                  filter(value => value.id ==idproduto).
                  map(value => {
                   
                  nome=value.descricao;
  
  
                      
  
  
                })
          return nome;
          
    }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Saida" />
        <Link to="/Saidaproduto" className='btn-novo'>Vendas</Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Id do Produto</th>
              <th>Quantidade</th>
              <th>Quantidade Vendida</th>
              <th>Valor Unitário</th>
              <th>Data de Saida</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entradas.map((entrada) => (
              <tr key={entrada.id}>
                <td>{entrada.id}</td>
                <td>{mostrarnome(entrada.id_produto)}</td>
                <td>{entrada.qtde}</td>
                <td>{calcularQuantidadeSaida(entrada.id_produto)}</td>
                <td>{entrada.valor_unitario}</td>
                <td>{entrada.data_entrada}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
