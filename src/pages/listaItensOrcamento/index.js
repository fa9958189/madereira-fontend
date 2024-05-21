import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FiPrinter, FiTrash } from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';
import Barrasuperior from '../../componente/Barrasuperior';
import Head from '../../componente/Head';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';
import { FaCircle, FaPlus, FaPlusCircle } from 'react-icons/fa';


export default function ListarItensOrcamento() {
  const { id } = useParams();
  const [orcamentos, setOrcamentos] = useState([]);
  const [orcamento, setOrcamento] = useState([]);
  const [nome, setNome] = useState();
  const [numeroorcamento, setNumeroorcamento] = useState();
  const [total, setTotal] = useState();
  const [count, setCount] = useState(0);
  const [produtos, setProdutos] = useState([]);
  const [id_produto, setId_produto] = useState();
  const [qtde, setQtde] = useState();
  const [valor_unitario, setValor_unitario] = useState();

  const dados = {
    id_orcamento: id,
    quantidade: qtde,
    valor_unitario,
    id_produto
  };
// Função de formatação de moeda
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}
  useEffect(() => {
    mostrarOrcamentos();
    mostrarOrcamento();
    mostrardados();
  }, [id]);

  const contar = () => {
    const newCount = count + 1;
    setCount(newCount);
    return newCount;
  };

  function mostrardados() {
    api.get('/produto')
      .then(res => {
        setProdutos(res.data.produtos);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
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

  const removerItem = (id) => {
    api.delete(`/itensorcamento/${id}`)
      .then(res => {
        if (res.status === 200) {
          console.log(`Item com ID ${id} excluído com sucesso!`);
          mostrarOrcamentos(); // Atualiza a lista após a exclusão
        } else {
          console.error("Erro ao excluir", res.data);
        }
      })
      .catch(error => {
        console.error("Erro ao excluir", error);
      });
  };

  const confirmarExclusao = (id) => {
    confirmAlert({
      title: 'Excluir Item do Orçamento',
      message: 'Deseja realmente excluir este Item?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => removerItem(id)
        },
        {
          label: 'Não',
          onClick: () => console.log('Exclusão cancelada')
        }
      ]
    });
  };

  const inserirItem = () => {
    confirmAlert({
      title: 'Inserir Produto no Orçamento',
      message: <div>
        <div>
          <select className='select-produto' value={id_produto} onChange={e => setId_produto(e.target.value)}>
            <option value="">Selecione um produto</option>
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>
                {produto.descricao}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input 
            placeholder='Qtd em metros' 
            value={qtde}
            onChange={e => setQtde(e.target.value)}
          />
          <input 
            placeholder='valor em metros' 
            value={valor_unitario}
            onChange={e => setValor_unitario(e.target.value)}
          />
        </div>
      </div>,
      buttons: [
        {
          label: 'Adicionar',
          onClick: () => {
            api.post('/itensorcamento', dados)
              .then(res => {
                if (res.status === 200) {
                  console.log(`Item adicionado com sucesso!`);
                  mostrarOrcamentos(); // Atualiza a lista após a inserção
                } else {
                  console.error("Erro ao adicionar item", res.data);
                }
              })
              .catch(error => {
                console.error("Erro ao adicionar item", error);
              });
          }
        },
        {
          label: 'Cancelar',
          onClick: () => console.log('Inserção cancelada')
        }
      ]
    });
  };

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className='dashboard-main'>
        <div className='principal'>
          <Head title="Tabela de Orçamentos" />
          <div className="fechar-container">
            <abbr title='Novo Item no Orçamento'>

            <FaPlusCircle size={34} className="btn_salvar" color="green" onClick={inserirItem} />

            </abbr>
            <div >
              <abbr title='Imprimir Orçamento'>

              <FiPrinter className="btn_imprimir" onClick={imprimirTabela}  size={34} />

              </abbr>
              
            </div>
          </div>
          <div className='head_orcamento'>

          <p>Cliente: {nome}</p>
          <p>Numero: {numeroorcamento}</p>
          <p>Total: {formatarMoeda(total)}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Produto</th>
                <th>Quantidade (m)</th>
                <th>Valor Unitário</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orcamentos.map((orcamento, index) => (
                <tr key={orcamento.id}>
                  <td>{index + 1}</td>
                  <td>{orcamento.descricao}</td>
                  <td>{orcamento.quantidade}</td>
                  <td>{formatarMoeda(orcamento.valor_unitario)}</td>
                  <td>{formatarMoeda(orcamento.total)}</td>
                  <td>
                    <FiTrash
                      size={18}
                      color='red'
                      onClick={() => confirmarExclusao(orcamento.id)}
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
