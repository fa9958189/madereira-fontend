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
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [total, setTotal] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    mostrarProdutos();
  }, []);

  function mostrarProdutos() {
    api.get('/produto')
      .then(res => {
        setProdutos(res.data.produtos);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }

  function calcularTotal() {
    const quantidadeFloat = parseFloat(quantidade);
    const valorUnitarioFloat = parseFloat(valorUnitario);
    const totalCalc = quantidadeFloat * valorUnitarioFloat;
    setTotal(totalCalc.toFixed(2));
  }

  function salvarOrcamento(e) {
    e.preventDefault();

    if (!quantidade || !valorUnitario || !selectedProduct) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    calcularTotal();

    const orcamento = {
      quantidade: parseFloat(quantidade),
      valor_unitario: parseFloat(valorUnitario),
      total: parseFloat(total),
      id_produto: selectedProduct
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
          <div className='form-container'>
            <form className='form-cadastro' onSubmit={salvarOrcamento}>
              <div className="table-container"> 
                <select className='select-produto' value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
                  <option value="">Selecione um produto</option>
                  {produtos.map(produto => (
                    <option key={produto.id} value={produto.id}>
                      {produto.descricao}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type='number'
                step='0.01'
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
                placeholder='Quantidade (m)'
              />
              <input
                type='number'
                step='0.01'
                value={valorUnitario}
                onChange={e => setValorUnitario(e.target.value)}
                onBlur={calcularTotal}
                placeholder='Valor (m)'
              />
              <input
                type='text'
                value={total}
                readOnly
                placeholder='Total'
              />
              <div className='acao'>
                <button className='btn-save' type="submit">
                  <FaSave />
                  Salvar
                </button>
                <button className='btn-cancel' type="button" onClick={() => navigate('/listarOrcamento')}>
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
