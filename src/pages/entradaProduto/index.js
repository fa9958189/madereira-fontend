import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Head from '../../componente/Head';

export default function Entradaproduto() {
  const navigate = useNavigate();
  const [id_produto, setId_produto] = useState("");
  const [qtde, setQtde] = useState("");
  const [valor_unitario, setValor_unitario] = useState("");
  const [data_entrada, setData_entrada] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    mostrarProdutos();
  }, []);

  function mostrarProdutos() {
    const produtos = JSON.parse(localStorage.getItem("cd-produtos") || "[]");
    setProdutos(produtos);
  }

  function salvardados(e) {
    e.preventDefault();

    if (!id_produto || !qtde || !valor_unitario || !data_entrada) {
      alert("Preencha todos os campos!");
      return;
    }

    const entrada = {
      id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
      id_produto,
      qtde: parseInt(qtde),
      valor_unitario: parseFloat(valor_unitario),
      data_entrada
    };

    const entradas = JSON.parse(localStorage.getItem("cd-entradas") || "[]");

    const entradaExistente = entradas.find(entrada => entrada.id_produto === id_produto);

    if (entradaExistente) {
      entradaExistente.qtde += entrada.qtde;
    } else {
      entradas.push(entrada);
    }

    localStorage.setItem("cd-entradas", JSON.stringify(entradas));

    atualizarEstoque(id_produto, parseInt(qtde));

    alert("Entrada salva com sucesso!");
    navigate('/entradaproduto');
  }

  function atualizarEstoque(idProduto, quantidade) {
    const estoque = JSON.parse(localStorage.getItem("cd-estoques") || "[]");
    const produtoExistente = estoque.find(item => item.id_produto === idProduto);

    if (produtoExistente) {
      produtoExistente.qtde += quantidade;
    } else {
      estoque.push({
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        id_produto,
        qtde: quantidade
      });
    }

    localStorage.setItem("cd-estoques", JSON.stringify(estoque));
  }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Cadastro de Entrada" />
        <div className='form-container'>
          <form className='form-cadastro' onSubmit={salvardados}>
            <input
              type='text'
              value={id_produto}
              onChange={e => setId_produto(e.target.value)}
              placeholder='Digite o id do produto'
            />
            <select value={id_produto} onChange={e => setId_produto(e.target.value)}>
              <option>Selecione um produto</option>
              {produtos.map(produto => (
                <option key={produto.id} value={produto.id}>
                  {produto.descricao}
                </option>
              ))}
            </select>
            <input
              type='number'
              value={qtde}
              onChange={e => setQtde(e.target.value)}
              placeholder='Digite a quantidade'
            />
            <input
              type='number'
              value={valor_unitario}
              onChange={e => setValor_unitario(e.target.value)}
              placeholder='Digite o valor unitário'
            />
            <input
              type='date'
              value={data_entrada}
              onChange={e => setData_entrada(e.target.value)}
              placeholder='Data da Entrada'
            />
            <div className='acao'>
              <button className='btn-save'>
                <FaSave />
                Salvar
              </button>
              <button className='btn-cancel'>
                <MdCancel />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
