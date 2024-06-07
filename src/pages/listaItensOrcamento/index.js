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
  const [orcamentos, setOrcamentos] = useState([]);
  const [orcamento, setOrcamento] = useState([]);
  const [nome, setNome] = useState();
  const [numeroorcamento, setNumeroorcamento] = useState();
  const [total, setTotal] = useState(0);
  const [tot, setTot] = useState(0);
  const [produtos, setProdutos] = useState([]);
  const [id_produto, setId_produto] = useState();
  const [qtde, setQtde] = useState(0);
  const [valor_unitario, setValor_unitario] = useState();
  const [situacao, setSituacao] = useState();
  const [loading, setLoading] = useState(true);
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

  const load =()=>{
    return(
      <>
        <img src={carregar} />
      </>
    )
  }
  useEffect(()=>{
   setTot(valor_unitario*qtde)
  },[valor_unitario,qtde])




 useEffect(()=>{
aportavalor()
 },[id_produto])
  useEffect(() => {
    mostrardados();
    mostrarOrcamento();
    mostrarOrcamentos();

    
    
  }, [id]);
  async function aportavalor(){
  if (id_produto == "undefined" || id_produto == null || id_produto == "") 
  {
    console.log ("id do produto nao foi definido")
  }
        else {
        await api.get(`/entrada/valorunitario/${id_produto}`)
          .then(resposta=>{
            setValor_unitario(resposta.data.valorunitario)
            setTot(valor_unitario*qtde)
          })
  .catch(error=>{
        alert("Houve um erro ao consulta o valor unitário")
  })
  .finally(()=>{
    alert("Processo finalizado!")
  })

}
   }
 async function mostrardados() {
  await  api.get('/produto')
      .then(res => {
        setProdutos(res.data.produtos);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }

async  function mostrarOrcamento() {
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

  async function mostrarOrcamentos() {
    try {
      const res = await api.get(`/itensorcamento/${id}`);
      setOrcamentos(res.data.orcamentos);
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error);
    }
  }
  
  const imprimirTabela = () => {
    window.print();
  };

   const removerItem = async (id) => {
   await api.delete(`/itensorcamento/${id}`)
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
          onClick: () =>  removerItem(id)
        },
        {
          label: 'Não',
          onClick: () => console.log('Exclusão cancelada')
        }
      ]
    });
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
            mostrarOrcamentos(); // Atualiza a lista após a inserção
          
          } else {
            console.error("Erro ao adicionar item", res.data);
          }
        })
        .catch(error => {
          console.error("Erro ao adicionar item", error);
        });
    }
  }
  
  const inserirItem = () => {
    confirmAlert({
      title: 'Inserir Produto no Orçamento',
      message: (
        <div>
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
              placeholder='Valor unitário' 
              value={valor_unitario}
              onChange={e => setValor_unitario(e.target.value)}
            />
          </div>
        </div>
      ),
      buttons: [
        {
          label: 'Adicionar',
          onClick: () => {
            salvarDados();
          }
        },
        {
          label: 'Cancelar',
          onClick: () => console.log('Inserção cancelada')
        }
      ]
    });
  };
  const enviardespacho=()=>{
    navigete(`/listarDespacho/${id}`)
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
          <div className='head-adicionar-itens'>
            <div className='div_campos'>
              {id_produto}
              <label>Selecionar um Produto</label>
                  <select className='select-produto' value={id_produto} onChange={e => setId_produto(e.target.value)}>
                        <option value="">Selecione um produto</option>
                        {produtos.map(produto => (
                          <option key={produto.id} value={produto.id}>
                            {produto.descricao}
                          </option>
                        ))}
                      </select>
            </div>
            <div className='div_campos'>
              <label>Quantidade</label>
            <input 
                  placeholder='Qtd em metros' 
                  value={qtde}
                  type="text"
                  onChange={e => setQtde(e.target.value)}
                />
            </div>
            <div className='div_campos'>
              <label>Valor Unitário</label>
            <input 
              placeholder='Valor unitário' 
              type="text"
              value={valor_unitario}
              onChange={e => setValor_unitario(e.target.value) }
            />

            </div>
            <div className='div_campos'>
            <label>Total</label>
                      <input
                        placeholder='Total'
                        type="text"
                        value={tot}
                        onChange={e =>setTot(e.target.value) }                       
                      
                      />
            </div>
            <div className='div_campos'>
            <FiPlusCircle size={24}  onClick={salvarDados} color="green" />
            </div>
            <div className="fechar-container">

              <div onClick={enviardespacho} className='btn-fechar'>
       
                 <span>Imprimir para Despacho</span> 
              
             </div>

  
                    {
                    situacao==="ABERTO"?
                    <Link to="/listarTabela" className='btn-fechar' style={{ marginRight: '10px' }}>Pagar</Link>:""
                  }
                    
       </div>
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
 
              {
              
         
              orcamentos.map((orcamento, index) => (
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
              ))
              
             
              }
          
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
