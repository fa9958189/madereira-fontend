import React, { useEffect, useState } from 'react';
import Menu from '../../componente/Menu';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import Barrasuperior from '../../componente/Barrasuperior';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';
import { Chart } from "react-google-charts";
import './style.css'; // Importando arquivo de estilos CSS para este componente

export default function ListarGraficos() {
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    mostrarEstoque();
  }, []);

  const mostrarEstoque = () => {
    api.get('/estoque')
      .then(res => {
        setEstoque(res.data.estoque);
      })
      .catch(error => {
        console.error('Erro ao buscar estoque:', error);
      });
  };

  const removerItemEstoque = (id) => {
    api.delete(`/estoque/${id}`)
      .then(res => {
        if (res.status === 200) {
          alert(`Item de estoque ID ${id} foi excluído com sucesso.`);
          mostrarEstoque();
        } else {
          alert("Houve um problema no servidor");
        }
      })
      .catch(error => {
        console.error('Erro ao excluir item de estoque:', error);
      });
  };

  const confirmarRemocao = (id) => {
    confirmAlert({
      title: 'Excluir Item de Estoque',
      message: 'Deseja realmente excluir este item de estoque?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => removerItemEstoque(id)
        },
        {
          label: 'Não',
          onClick: () => alert('Ação cancelada')
        }
      ]
    });
  };

  // Convertendo os dados do estoque para o formato esperado pelo gráfico
  const dadosDoGrafico = [['Produto', 'Quantidade em Estoque']];
  estoque.forEach(item => {
    dadosDoGrafico.push([item.nome_produto, item.quantidade_em_estoque]);
  });

  return (
    <div className="dashboard-container">
                        <Barrasuperior />
      <div className='dashboard-main'>
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Gráficos de Estoque" />
        <div className="chart-container">
          <Chart
            width={'800px'} // Aumentando o tamanho do gráfico
            height={'500px'} // Aumentando o tamanho do gráfico
            chartType="BarChart"
            loader={<div>Carregando Gráfico</div>}
            data={dadosDoGrafico}
            options={{
              chart: {
                title: 'Quantidade em Estoque por Produto',
                subtitle: 'Quantidade em Estoque de cada Produto',
              },
              backgroundColor: 'transparent', // Definindo o fundo como transparente
              legend: { position: 'top' }, // Centralizando a legenda no topo
            }}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
