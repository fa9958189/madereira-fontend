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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [parcelas,setParcelas] = useState([])

  const [tipo, setTipo] = useState("");
  const [recebido, setRecebido] = useState(0);
  const [troco, setTroco] = useState(0);
  const [situacaoPagamento, setSituacaoPagamento] = useState();

  const [show, setShow] = useState(false);
  const fechaModal = () => setShow(false);
  const [showPagar, setShowPagar] = useState(false);
  const fechaModalPagar = () => setShowPagar(false);
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

  const load = () => {
    return (
      <>
        <img src={carregar} />
      </>
    )
  }

  useEffect(() => {
    setTot(valor_unitario * qtde)
  }, [valor_unitario, qtde])

  useEffect(() => {
    aportavalor()
  }, [id_produto])

  useEffect(() => {
    mostrardados();
    mostrarOrcamento();
    mostrarOrcamentos();
  }, [id]);

  const abrirModal = () => {
    setShow(true);
  }

  const abrirModalPagar = () => {
    setShowPagar(true);
  }

  async function aportavalor() {
    if (id_produto == "undefined" || id_produto == null || id_produto == "") {
      console.log("id do produto nao foi definido")
    } else {
      await api.get(`/entrada/valorunitario/${id_produto}`)
        .then(resposta => {
          setValor_unitario(resposta.data.valorunitario)
          setTot(valor_unitario * qtde)
        })
        .catch(error => {
          alert("Houve um erro ao consulta o valor unitário")
        })
        .finally(() => {
          alert("Processo finalizado!")
        })
    }
  }


  async function mostrardados() {
    await api.get('/produto')
      .then(res => {
        setProdutos(res.data.produtos);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }


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
          onClick: () => removerItem(id)
        },
        {
          label: 'Não',
          onClick: () => console.log('Exclusão cancelada')
        }
      ]
    });
  };

  useEffect(() => {

  }, [recebido])

  const handleRecebidoChange = (valor) => {
    const valorRecebido = parseFloat(valor);
    setRecebido(valorRecebido);
    setTroco(valorRecebido - total);
  }

  const salvarDados = async () => {
    if (id_produto === "" || qtde === "" || valor_unitario === "") {
      alert("Há campos vazios");
    } else {
      await api.post('/itensorcamento', dados)
        .then(res => {
          if (res.status === 201) {
            console.log(`Item adicionado com sucesso!`);
            mostrarOrcamento();
            mostrarOrcamentos(); // Atualiza a lista após a inserção
            fechaModal();
          } else {
            console.error("Erro ao adicionar item", res.data);
          }
        })
        .catch(error => {
          console.error("Erro ao adicionar item", error);
        });
    }
  }
 const gerarParcelas = () =>{

 }

 const lista =()=>{
  api.get("/parcela")
  .then((resposta)=>{
        setParcelas(resposta.data.parcelas)
  })
 }



                              const salvarPagamento = async () => {
                                const pagamento = {
                                    recebido,
                                    troco,
                                    situacaoPagamento,
                                    id_orcamento: id // Inclua o ID do orçamento atual
                                };

                                await api.post('/itensorcamento/pagamento', pagamento)
                                    .then(res => {
                                        if (res.status === 201) {
                                            console.log(`Pagamento registrado e estoque atualizado com sucesso!`);
                                            mostrarOrcamento();
                                        } else {
                                            console.error("Erro ao registrar pagamento", res.data);
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Erro ao registrar pagamento", error);
                                    });
                              };


  const enviardespacho = () => {
    navigete(`/listarDespacho/${id}`)
  }

  return (
    <div className="dashboard-container">
      <Modal show={showPagar} onHide={fechaModalPagar}>
        <Modal.Header closeButton>
          <Modal.Title>Pagamento </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='head_orcamento'>
            <p>Total: {formatarMoeda(total)}</p>
          </div>
          <div>
            <div className='container_adicionar'>
              {tipo}
              <label> Tipo de Pagamento</label>
              <select onChange={e => setTipo(e.target.value)}>
                <option value="0">Tipo de Pagamento</option>
                <option value="1">Cartão Debito</option>
                <option value="2">Cartão Crédito</option>
                <option value="3">À vista</option>
                <option value="4">À prazo</option>
              </select>
            </div>

            {tipo === "4" ? (
              <div className='container-aprazo'>
                <div>
                <div className='container_adicionar'>
                  <label>Qtd Parcelas</label>
                  <input type="text" />
                  </div>
                  <div className='container_adicionar'>
                  <label>Valor da Entrada</label>
                  <input type="text" />
                  </div>
                  <div className='container_adicionar'>                 
                  <label>1º Vencimento</label>
                  <input type="date" />
                  </div>
                  <div className='container_adicionar'>
                      <button class='btn btn-success' onClick={gerarParcelas}>Gerar Parcelas</button>
                </div>
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Ordem</th>
                        <th>Orçamento</th>
                        <th>Vlr Parcela</th>
                        <th>Vencimento</th>
                      </tr>
                    </thead>
                    <tbody>
                    
                    {parcelas.map(parcela => (
                                    <tr key={parcela.quantidadeparcelas}>
                                        <td>{parcela.numeroorcamento}</td>
                                        <td>{parcela.valorparcela}</td>
                                        <td>{parcela.cpf}</td>
                                        <td>{parcela.cep}</td>
                                    </tr>
                                ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (

                                          <div className='container-avista'>
                                          <div className='container_adicionar'>
                                              <label>Valor Recebido</label>
                                              <input
                                                  type="number"
                                                  inputMode="numeric"
                                                  pattern="[0-9]*"
                                                  placeholder='Valor Recebido'
                                                  onChange={e => handleRecebidoChange(e.target.value)}
                                                  value={recebido}
                                              />
                                          </div>
                                          <div className='container_adicionar'>
                                              <label>Troco</label>
                                              <input
                                                  type="text"
                                                  placeholder='Troco'
                                                  value={formatarMoeda(troco)}
                                                  readOnly
                                              />
                                          </div>
                                          <div className='container_adicionar'>
                                              <button class='btn btn-success' onClick={salvarPagamento}>Salvar Pagamento</button>
                                          </div>
                                      </div>
                                      
              
            )}

          </div>
        </Modal.Body>
      </Modal>

      <Modal show={show} onHide={fechaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className='container_adicionar'>
              <label>Selecionar um Produto</label>
              <select className='select-produto' value={id_produto}
                onChange={e => setId_produto(e.target.value)}>
                <option value="">Selecione um produto</option>
                {produtos.map(produto => (
                  <option key={produto.id} value={produto.id}>
                    {produto.descricao}
                  </option>
                ))}
              </select>
            </div>
            <div className='container_adicionar'>
              <label>Quantidade</label>
              <input
                placeholder='Qtd em metros'
                value={qtde}
                type="text"
                onChange={e => setQtde(e.target.value)}
              />
            </div>
            <div className='container_adicionar'>
              <label>Valor Unitário</label>
              <input
                placeholder='Valor unitário'
                type="text"
                value={valor_unitario}
                onChange={e => setValor_unitario(e.target.value)}
              />
            </div>
            <div className='container_adicionar'>
              <label>Total</label>
              <input
                placeholder='Total'
                type="text"
                value={tot}
                onChange={e => setTot(e.target.value)}
              />
            </div>
            <div className='container_adicionar'>
              <button type="button" onClick={salvarDados} class="btn btn-success">Salvar</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Barrasuperior />
      <div className='dashboard-main'>
        <div className='principal'>
          <Head title="Tabela de Orçamentos" />
          <div className='head_orcamento'>
            <p>Cliente: {nome}</p>
            <p>Orçamento: {numeroorcamento}</p>
            <p>Total: {formatarMoeda(total)}</p>
            <p>Situação: {situacao}</p>
            <button type="button" onClick={abrirModal} class="btn btn-primary">Adicionar</button>
            <button type="button" onClick={enviardespacho} class="btn btn-secondary">Imprimir/Despachar</button>
            <button type="button" onClick={abrirModalPagar} class="btn btn-info">Pagamento</button>
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
