import React, { useEffect, useState } from 'react';
import Menu from '../../componente/Menu';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';
import { Chart } from "react-google-charts";
import './style.css'; // Importando arquivo de estilos CSS para este componente

export default function ListarGraficos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    mostrarProdutos();
  }, []);

  const mostrarProdutos = () => {
    api.get('/produto')
      .then(res => {
        setProdutos(res.data.produtos);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  };

  const removerProduto = (id) => {
    api.delete(`/produto/${id}`)
      .then(res => {
        if (res.status === 200) {
          alert(`Produto ID ${id} foi excluído com sucesso.`);
          mostrarProdutos();
        } else {
          alert("Houve um problema no servidor");
        }
      })
      .catch(error => {
        console.error('Erro ao excluir produto:', error);
      });
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

  // Convertendo os dados dos produtos para o formato esperado pelo gráfico
  const dadosDoGrafico = [['Produto', 'Estoque Mínimo', 'Estoque Máximo']];
  produtos.forEach(produto => {
    dadosDoGrafico.push([produto.descricao, produto.estoque_minimo, produto.estoque_maximo]);
  });

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Gráficos de Produtos" />
        <div className="chart-container">
          <Chart
            width={'800px'} // Aumentando o tamanho do gráfico
            height={'500px'} // Aumentando o tamanho do gráfico
            chartType="BarChart"
            loader={<div>Carregando Gráfico</div>}
            data={dadosDoGrafico}
            options={{
              chart: {
                title: 'Estoque Mínimo e Máximo dos Produtos',
                subtitle: 'Estoque Mínimo e Máximo de cada Produto',
              },
              backgroundColor: 'transparent', // Definindo o fundo como transparente
              legend: { position: 'top' }, // Centralizando a legenda no topo
            }}
          />
        </div>
      </div>
    </div>
  );
}
