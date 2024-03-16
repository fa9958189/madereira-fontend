import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import Head from '../../componente/Head';
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import api from '../../server/api';


export default function CadastroSaida() {
  const navigate = useNavigate();
  const [id_produto, setId_produto] = useState("");
  const [qtde, setQtde] = useState("");
  const [valor_unitario, setValor_unitario] = useState("");
  const [data_saida, setData_saida] = useState("");
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

    if (!id_produto || !qtde || !valor_unitario || !data_saida) {
      alert("Preencha todos os campos!");
      return;
    }

    const saida = {
      id_produto,
      qtde: parseInt(qtde),
      valor_unitario: parseFloat(valor_unitario),
      data_saida
    };

    api.post('/saida', saida)
      .then(response => {
        alert(response.data.mensagem);
        navigate('/listarsaida');
      })
      .catch(error => console.error('Erro ao cadastrar saída de produto:', error));
  }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Cadastro de Saída" />
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
  );
}
