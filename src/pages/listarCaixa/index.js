import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import { FiPlusCircle, FiPrinter, FiTrash } from "react-icons/fi";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Barrasuperior from '../../componente/Barrasuperior';
import Head from '../../componente/Head';
import carregar from '../../assets/img/loading.gif';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';

export default function ListarItensOrcamento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orcamento, setOrcamento] = useState([]);
  const [nome, setNome] = useState();
  const [numeroorcamento, setNumeroorcamento] = useState();
  const [total, setTotal] = useState(0);
  const [id_produto, setId_produto] = useState();
  const [tipo, setTipo] = useState("");
  const [recebido, setRecebido] = useState(0);
  const [troco, setTroco] = useState(0);
  const [qtde, setQtde] = useState(0);
  const [valor_unitario, setValor_unitario] = useState();
  const [situacao, setSituacao] = useState();

  const dados = {
    id_orcamento: id,
    total,
  };

  // Função de formatação de moeda
  function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  useEffect(() => {
    mostrarOrcamento();
  }, []);

  async function mostrarOrcamento() {
    await api.get(`/orcamento/${id}`)
      .then(response => {
        setOrcamento(response.data.orcamento);
        setNome(response.data.orcamento[0].nome);
        setNumeroorcamento(response.data.orcamento[0].id);
        setSituacao(response.data.orcamento[0].situacao)
        setTotal(response.data.orcamento[0].totalgeral);
      })
      .catch(error => console.error('Erro ao buscar orçamento:', error));
  }

  const imprimirTabela = () => {
    window.print();
  };

  const salvarDados = async () => {
    if (id_produto === "" || qtde === "" || valor_unitario === "") {
      alert("Há campos vazios");
    } else {
      await api.post('/itensorcamento', dados)
        .then(res => {
          if (res.status === 201) {
            console.log(`Item adicionado com sucesso!`);
            mostrarOrcamento();
          } else {
            console.error("Erro ao adicionar item", res.data);
          }
        })
        .catch(error => {
          console.error("Erro ao adicionar item", error);
        });
    }
  }

  const handleRecebidoChange = (e) => {
    const valorRecebido = parseFloat(e.target.value);
    setRecebido(valorRecebido);
    setTroco(valorRecebido - total);
  }

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className='dashboard-main'>
        <div className='principal'>
          <Head title="Tabela de Orçamentos" />
          <div className='head_orcamento'>
            <p>Cliente: {nome}</p>
            <p>Orçamento: {numeroorcamento}</p>
            <p>Total: {formatarMoeda(total)}</p>
            <p>Situação: {situacao}</p>
          </div>
          <div className='main_orcamento'>
            <select onChange={e => setTipo(e.target.value)}>
              <option value="">Selecione o Tipo de Pagamento</option>
              <option value="Cartão Debito">Cartão Debito</option>
              <option value="Cartão Crédito">Cartão Crédito</option>
              <option value="A vista">À vista</option>
              <option value="A prazo">À prazo</option>
            </select>
            <label>Valor Recebido</label>
            <input
              type="number"
              placeholder='Valor Recebido'
              value={recebido}
              onChange={handleRecebidoChange}
            />
                  <label>Troco</label>
              <input
                type="text"
                placeholder='Troco'
                value={formatarMoeda(troco)}
                readOnly
              />
         
            <button onClick={salvarDados}>Salvar Pagamento</button>
          </div>
        </div>
      </div>
    </div>
  );
}
