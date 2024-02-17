import React from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { Link } from 'react-router-dom';
import Head from '../../componente/Head';

export default function Listaestoque() {
  const entradas = JSON.parse(localStorage.getItem("cd-entradas") || "[]");
  const saidas = JSON.parse(localStorage.getItem("cd-saidas") || "[]");

  const calcularEstoqueAtual = (id_produto) => {
    const quantidadeEntrada = entradas.filter(entrada => entrada.id_produto === id_produto)
                                       .reduce((total, entrada) => total + entrada.qtde, 0);
    const quantidadeSaida = saidas.filter(saida => saida.id_produto === id_produto)
                                  .reduce((total, saida) => total + saida.qtde, 0);
    return quantidadeEntrada - quantidadeSaida;
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
        <Head title="Lista Estoque" />
  
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Id do Produto</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {entradas.map((entrada) => (
              <tr key={entrada.id}>
                <td>{entrada.id}</td>
                <td>{mostrarnome(entrada.id_produto)}</td>
                <td>{calcularEstoqueAtual(entrada.id_produto)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
