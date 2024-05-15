import React, { useState, useEffect } from 'react';
import '../../pages/global.css';
import Menu from '../../componente/Menu';
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../componente/Head';
import api from '../../server/api';
import Barrasuperior from '../../componente/Barrasuperior';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function EditarCliente() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    cep: "",
    bairro: "",
    logradouro: "",
    cidade: "",
    uf: "",
    contato: "",
    data: new Date() // Definir a data inicial como a data atual
  });

  useEffect(() => {
    mostrarDados(id);
  }, [id]);

  async function mostrarDados(id) {
    try {
      const response = await api.get(`/cliente/${id}`);
      const { nome, cpf, cep, bairro, logradouro, cidade, uf, contato, data } = response.data.cliente;
      setCliente({
        nome: nome || "",
        cpf: cpf || "",
        cep: cep || "",
        bairro: bairro || "",
        logradouro: logradouro || "",
        cidade: cidade || "",
        uf: uf || "",
        contato: contato || "",
        data: data ? new Date(data) : new Date() // Converter a data para um objeto Date, se existir
      });
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
    }
  }

  const handleCepBlur = async (event) => {
    const cep = event.target.value;
    if (cep.length === 8) {
      try {
        const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        setCliente(prevState => ({
          ...prevState,
          bairro: data.bairro || '',
          logradouro: data.logradouro || '',
          cidade: data.localidade || '',
          uf: data.uf || ''
        }));
      } catch (error) {
        console.error("Erro ao consultar CEP:", error);
        alert("Erro ao consultar CEP. Verifique o CEP e tente novamente.");
      }
    }
  };

  function salvarDados(e) {
    e.preventDefault();

    const { nome, cpf, cep, bairro, logradouro, cidade, uf, contato, data } = cliente;

    if (!nome || !cpf || !cep || !bairro || !logradouro || !cidade || !uf || !contato || !data) {
      alert("Verifique! Há campos vazios!");
      return;
    }

    const clienteAtualizado = { ...cliente, id };

    api.patch(`/cliente`, clienteAtualizado)
      .then(response => {
        console.log(response.data);
        alert(response.data.mensagem);
        navigate('/listarcliente');
      })
      .catch(error => {
        console.error("Erro ao atualizar cliente:", error);
        alert("Erro ao atualizar cliente. Verifique os campos e tente novamente.");
      });
  }

  return (
    <div className="dashboard-container">
      <Barrasuperior />
      <div className="dashboard-main">
        <div className='menu'>
          <Menu />
        </div>
        <div className='principal'>
          <Head title="Editar Cliente" />
          <div className='form-container'>
            <form className='form-cadastro' onSubmit={salvarDados}>
              <input
                type='text'
                value={cliente.nome}
                onChange={e => setCliente({ ...cliente, nome: e.target.value })}
                placeholder='Digite o nome do cliente'
              />
              <input
                type='text'
                value={cliente.cpf}
                onChange={e => setCliente({ ...cliente, cpf: e.target.value })}
                placeholder='Digite o CPF'
              />
              <input
                type='text'
                value={cliente.cep}
                onBlur={handleCepBlur}
                onChange={e => setCliente({ ...cliente, cep: e.target.value })}
                placeholder='Digite o CEP'
              />
              <input
                type='text'
                value={cliente.bairro}
                onChange={e => setCliente({ ...cliente, bairro: e.target.value })}
                placeholder='Digite o Bairro'
              />
              <input
                type='text'
                value={cliente.logradouro}
                onChange={e => setCliente({ ...cliente, logradouro: e.target.value })}
                placeholder='Digite o Logradouro'
              />
              <input
                type='text'
                value={cliente.cidade}
                onChange={e => setCliente({ ...cliente, cidade: e.target.value })}
                placeholder='Digite a Cidade'
              />
              <input
                type='text'
                value={cliente.uf}
                onChange={e => setCliente({ ...cliente, uf: e.target.value })}
                placeholder='Digite o UF'
              />
              <input
                type='text'
                value={cliente.contato}
                onChange={e => setCliente({ ...cliente, contato: e.target.value })}
                placeholder='Digite o Contato'
              />
              <DatePicker
                selected={cliente.data}
                onChange={date => setCliente({ ...cliente, data: date })}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione a Data"
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
    </div>
  );
}
