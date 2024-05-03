// frontend/src/pages/CadastroOrcamento.js

import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import Head from '../../componente/Head';
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Barrasuperior from '../../componente/Barrasuperior';
import { useNavigate } from 'react-router-dom';
import api from '../../server/api';

export default function CadastroOrcamento() {
  const navigate = useNavigate();
  const [id_produto, setId_produto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor_unitario, setValor_unitario] = useState("");
  const [data_saida, setData_saida] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    mostrarProdutos();
  }, []);

  function mostrarProdutos() {
    api.get('/entrada')
      .then(res => {
        setProdutos(res.data.entradas);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }

  function salvarOrcamento(e) {
    e.preventDefault();

    if (!id_produto || !quantidade || !valor_unitario || !data_saida) {
      alert("Preencha todos os campos!");
      return;
    }

    const orcamento = {
      id_produto,
      quantidade: parseFloat(quantidade),
      valor_unitario: parseFloat(valor_unitario),
      data_saida
    };

    api.post('/orcamento', orcamento)
      .then(response => {
        alert(response.data.mensagem);
        navigate('/listarOrcamento');
      })
      .catch(error => console.error('Erro ao cadastrar orçamento:', error));
  }

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className='dashboard-main'>
        <div className='menu'>
          <Menu />
        </div>
        <div className='principal'>
          <Head title="Cadastro de Orçamento" />
          <div className='form'>
            <form className='form-cadastro' onSubmit={salvarOrcamento}>
              <select className='select-produto' value={id_produto} onChange={e => setId_produto(e.target.value)}>
                <option value="">Selecione um produto</option>
                {produtos.map(produto => (
                  <option key={produto.id} value={produto.id}>
                    {produto.descricao} - R$ {produto.valor_unitario}
                  </option>
                ))}
              </select>
              <input
                type='number'
                step='0.01'
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
                placeholder='Digite a quantidade'
              />
              <input
                type='date'
                value={data_saida}
                onChange={e => setData_saida(e.target.value)}
                placeholder='Data da Saída'
              />
              <div className='acao'>
                <button className='btn-save' type="submit">
                  <FaSave />
                  Salvar
                </button>
                <button className='btn-cancel' type="button">
                  <MdCancel />
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
