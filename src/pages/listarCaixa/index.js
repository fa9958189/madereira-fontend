import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import { FiPlusCircle, FiPrinter, FiTrash } from "react-icons/fi";
import { useParams,useNavigate, Link } from 'react-router-dom';
import Barrasuperior from '../../componente/Barrasuperior';
import Head from '../../componente/Head';
import carregar from '../../assets/img/loading.gif';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '../../server/api';




export default function ListarItensOrcamento() {
  const { id } = useParams();
  const navigete = useNavigate();
  const [orcamento,setOrcamento] = useState([]);
  const [nome, setNome] = useState();
  const [numeroorcamento, setNumeroorcamento] = useState();
  const [total, setTotal] = useState(0);
  const [id_produto, setId_produto] = useState();
  const [tipo,setTipo] = useState("")
  const [recebido,setRecebido] = useState(0);
  const [troco,setTroco] = useState(0)
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



async  function mostrarOrcamento() {
   await api.get(`/orcamento/${id}`)
      .then(response => {
        setOrcamento(response.data.orcamento);
        setNome(response.data.orcamento[0].nome);
        setNumeroorcamento(response.data.orcamento[0].id);
        setSituacao(response.data.orcamento[0].situacao)
        setTotal(response.data.orcamento[0].totalgeral);
        console.log(orcamento)
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
    await  api.post('/itensorcamento', dados)
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
          <select>
              <option>Cartão Debito</option>
              <option>Cartão Crédito</option>
              <option>A vista</option>
              <option>A prazo</option>
            </select>
            <input type="text" placeholder='valor Recebido' />
            <input type="text" placeholder='troco' />
            <input type="text" placeholder='valor Pago' />
            <button>Salvar Pagamento</button>
          </div>

        </div>
      </div>
    </div>
  );
}
