// Entradaproduto.js

import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Barrasuperior from '../../componente/Barrasuperior';
import { useNavigate } from 'react-router-dom';
import Head from '../../componente/Head';
import api from '../../server/api';
import "./entrada.css";


export default function Entradaproduto() {
  const navigate = useNavigate();
  const [id_produto, setId_produto] = useState("");
  const [qtde, setQtde] = useState("");
  const [valor_unitario, setValor_unitario] = useState("");
  const [data_entrada, setData_entrada] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    mostrardados();
  }, []);

  function mostrardados() {
    api.get('/produto')
      .then(res => {
        setProdutos(res.data.produtos);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }

  function salvardados(e) {
    e.preventDefault();

    if (!id_produto || !qtde || !valor_unitario || !data_entrada) {
      alert("Preencha todos os campos!");
      return;
    }

    const entrada = {
      id_produto,
      qtde: parseFloat(qtde), // Convertendo para float
      valor_unitario: parseFloat(valor_unitario),
      data_entrada
    };

    api.post('/entrada', entrada)
      .then(response => {
        alert(response.data.mensagem);
        navigate('/listaentradaproduto');
      })
      .catch(error => console.error('Erro ao cadastrar entrada de produto:', error));
  }

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className='dashboard-main'>
        <div className='menu'>
          <Menu />
        </div>
        <div className='principal'>
          <Head title="Cadastro de Entrada" />
          <div className='form'>
            <form className='form-cadastro' onSubmit={salvardados}>
              <select className='select-produto' value={id_produto} onChange={e => setId_produto(e.target.value)}>
                <option value="">Selecione um produto</option>
                {produtos.map(produto => (
                  <option key={produto.id} value={produto.id}>
                    {produto.descricao}
                  </option>
                ))}
              </select>
              <input
                type='number'
                step='0.01' // Permitindo valores decimais
                value={qtde}
                onChange={e => setQtde(e.target.value)}
                placeholder='Digite a quantidade (m)'
              />
              <input
                type='number'
                value={valor_unitario}
                onChange={e => setValor_unitario(e.target.value)}
                placeholder='Digite o valor do (m)'
              />
              <input
                type='date'
                value={data_entrada}
                onChange={e => setData_entrada(e.target.value)}
                placeholder='Data da Entrada'
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
